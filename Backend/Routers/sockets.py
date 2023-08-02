import json
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.websockets import WebSocket
from starlette.websockets import WebSocketDisconnect
from Utils.dependens import message_service, user_to_user
from Utils.auth_utils import auth_user
from services.message import MessageService
from services.user import UserService

socket_router = APIRouter(prefix='/sockets', tags=['Websockets'])
active_connections = {}


@socket_router.websocket('/messenger')
async def messenger(websocket: WebSocket, message_service: Annotated[MessageService, Depends(message_service)], user_service: Annotated[UserService, Depends(user_to_user)]):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            res = json.loads(data)
            
            if not isinstance(res['token'], str):
                raise HTTPException(status_code=400, detail='Token is not a string')
            
            username = auth_user(res['token'])
            active_connections[username] = [websocket, res['to']]
            try:
                await message_service.delete_message(res['id'])
            except KeyError:
                pass
            if (res['to'] != 'None') and (res['message'] != ''):
                    await message_service.add_message(username, res['to'], res['message'])
            else:
                await user_service.create_dialogue(username, res['to'])
                
            if len(active_connections) > 2:
                connection_for_response = {username: active_connections[username],res['to']: active_connections[res['to']]}
            else:
                connection_for_response = active_connections
                
            for key in connection_for_response:
                messages = await message_service.get_messages(key, connection_for_response[key][1])
                response = '{"messages":' + str(messages) + '}'
                response = response.replace("'", "\"")
                await connection_for_response[key][0].send_text(response)
    except WebSocketDisconnect:
        active_connections.pop(username)

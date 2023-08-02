from Utils.repository import AbstractRepository
from database.models import Message


class MessageService:
    def __init__(self, repo: AbstractRepository):
        self.repo: AbstractRepository = repo()

    async def get_messages(self, username: str, to: str):
        messages_send = await self.repo.get_all_by_filter(12, [Message.from_user == username, Message.to_user == to, Message.is_delete == False],
                                                          Message.created_at.desc())
        messages_get = await self.repo.get_all_by_filter(12, [Message.from_user == to, Message.to_user == username, Message.is_delete == False],
                                                         Message.created_at.desc())
        messages_send = [[mes.body, mes.created_at.strftime('%H:%M:%S'), 1, mes.id] for mes in messages_send]
        messages_get = [[mes.body, mes.created_at.strftime('%H:%M:%S'), 2, mes.id] for mes in messages_get]
        return messages_send + messages_get

    async def add_message(self, fro: str, to: str, body: str):
        data = {
            'body': body,
            'from_user': fro,
            'to_user': to
        }
        await self.repo.add_one(data)

    async def delete_message(self, id: int):
        await self.repo.mark_as_delete(id)
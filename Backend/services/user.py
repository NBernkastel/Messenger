from Utils.repository import AbstractRepository
from Utils.auth_utils import generate_salt, hash_password
from database import models
from schemas import schemas


class UserService:
    def __init__(self, repo: AbstractRepository):
        self.repo: AbstractRepository = repo()

    async def create_user(self, user: schemas.RegisterUser):
        salt = generate_salt()
        db_user = {
            'username': user.username,
            'password': hash_password(user.password, salt),
            'email': user.email,
            'salt': salt}
        await self.repo.add_one(db_user)

    async def get_user(self, username):
        user: models.User = await self.repo.get_one(models.User.username == username)
        return user

    async def user_searc(self, username):
        users: list[models.User] = await self.repo.get_all_by_filter(5, [models.User.username.like(f"%{username}%")], models.User.username.desc())
        return [user.username for user in users]
    
    async def create_dialogue(self, username_from, username_to):
        users: list[models.UserToUser] = await self.repo.get_all_by_filter(0,[models.UserToUser.first_user == username_from, models.UserToUser.second_user == username_to, models.UserToUser.have_dialog == True], models.UserToUser.id.desc())
        if len(users) == 0:
            user_to_user ={
                'first_user': username_from,
                'second_user': username_to,
                'have_dialog': True
            }
            await self.repo.add_one(user_to_user)
            
    async def get_usernames(self, username):
        users: list[models.UserToUser] = await self.repo.get_all_by_filter(5, [models.UserToUser.first_user == username, models.UserToUser.have_dialog == True], models.UserToUser.id.desc())
        return [user.second_user for user in users]

    async def add_message(self, username: str, to: str, body: str):
        message = models.Message(body=body, from_user=username, to_user=to)
        await self.repo.add_one(message)

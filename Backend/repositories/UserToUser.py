from Utils.repository import SQLAlchemyRepository
from database.models import UserToUser


class UserToUserRepository(SQLAlchemyRepository):
    model = UserToUser

from Utils.repository import SQLAlchemyRepository
from database.models import Message


class MessageRepository(SQLAlchemyRepository):
    model = Message

from repositories.UserToUser import UserToUserRepository
from repositories.message import MessageRepository
from repositories.user import UserRepository
from services.email import EmailService
from services.message import MessageService
from services.user import UserService


def user_service():
    return UserService(UserRepository)


def message_service():
    return MessageService(MessageRepository)


def email_service():
    return EmailService()

def user_to_user():
    return UserService(UserToUserRepository)
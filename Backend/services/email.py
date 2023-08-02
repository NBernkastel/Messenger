from email.message import EmailMessage
import smtplib

from Utils.config import EMAIL_PASSWORD, EMAIL_USER

class EmailService():
    def get_email(self,username, code):
        email = EmailMessage()
        email['Subject'] = 'Messenger'
        email['From'] = EMAIL_USER
        email['to'] = username
        email.set_content(
            'Your code is , %s!' % code
        )
        return email


    async def send_email(self,to, code):
        email = self.get_email(to, code)
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(email)

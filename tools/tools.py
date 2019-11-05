def get_telegram_token(name: str) -> str:
    from telethon.sync import TelegramClient, events
    client = TelegramClient('get_new_bot_token', 1170703, '57ce76b0fed0ae5e8103fb42e20021ba')
    token = ""
    @client.on(events.NewMessage(chats=('BotFather',)))
    async def handle_token(event):
        nonlocal token
        msg = event.message.to_dict()['message']
        if 'Done! Congratulations on your new bot' in msg:
            start = msg.index('Use this token to access the HTTP API:')+len('Use this token to access the HTTP API:')+1
            token = msg[start:start+46]

    client.start()
    client.send_message('BotFather', '/start')
    client.send_message('BotFather', '/newbot')
    client.send_message('BotFather', name)
    client.send_message('BotFather', name+'UglyBotlingBot')

    if token:
        return token
    return "smth"


def get_vk_token() -> str:
    pass


def make_email_request(address: str, theme: str, message: str):
    import smtplib
    from email.message import EmailMessage
    request = EmailMessage()
    request.set_content(message)
    request["Subject"] = theme
    request["From"] = "UglyBotling Email Service"
    request["To"] = address
    session = smtplib.SMTP("host")
    session.send_message(request, to_addrs=[address])
    session.quit()


def count_usage_of(function, pattern: str) -> int:
    pass


def email_confirmation(address: str, confirmation_of: str, confirmation_link: str):
    make_email_request(address, "Please confirm %s!" % confirmation_of, """%s""" % confirmation_link)


if __name__ == '__main__':
    print(get_telegram_token('Botling'))

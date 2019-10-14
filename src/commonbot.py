import telebot


class CommonBot:
    """Класс для наследования в бота"""
    def __init__(self):
        """TODO: make objects of bots of vk and tg"""
        tb_bot = telebot.TeleBot('')

    def add_default_reply(self, trigger: str, reply: str):
        """TODO: parse function from the string and add it to bot object"""

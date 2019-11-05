import telebot
# import vk_api
import tools.tools as tools


class CommonBot:
    """Класс для наследования в бота"""
    def __init__(self, name):
        """Make objects of bots of vk and tg"""
        self.tg_bot = telebot.TeleBot(tools.get_telegram_token(name))
        # self.vk_bot = vk_api.VkApi(token='').get_api()

    def add_default_reply(self, trigger: str, reply: str):
        """Add default message reply"""
        @self.tg_bot.message_handler(func=lambda msg: msg.text == trigger)
        def foo(msg):
            self.tg_bot.send_message(msg.chat.id, reply)

from tools.commonbot import CommonBot


def singleton_constructor(cls, class_, *args, **kwargs):
    if not hasattr(cls, 'instance'):
        cls.instance = super(class_, cls).__new__(cls)
    return cls.instance


class BotConstructor:
    """Класс для создания кастомных ботов"""
    trigger_reply = {'/start': 'Welcome to the UglyBotling|default'}
    polling = True

    @staticmethod
    def __split(string: str, splitter: str) -> list:
        array = string.split(splitter)
        new_array = []
        i = 0
        while i < len(array):
            if array[i][-1] == '\\':
                new_array.append(array[i][:-1]+array[i+1])
                del array[i+1]
                i += 1
            else:
                new_array.append(array[i])
                i += 1
        return new_array

    def __init__(self, name: str, trigger_reply_sheet: dict):
        """Каждый экземпляр конструктора создает один класс кастомного бота"""
        self.trigger_reply_sheet = trigger_reply_sheet
        self.bot_class = type(name, (CommonBot,), {})  # Создание класса нового бота
        self.bot_class.__new__ = lambda cls: singleton_constructor(cls, self.bot_class)
        self.bot = self.bot_class(name)

    def build(self):
        """Добавление функционала в кастомного бота из словаря trigger_reply_sheet"""
        for trigger in self.trigger_reply.keys():
            reply = self.__split(self.trigger_reply[trigger], '|')
            self.bot.add_default_reply(trigger, reply)
        if self.polling:
            self.bot.polling()

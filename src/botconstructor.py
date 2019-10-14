from src.commonbot import CommonBot


class BotConstructor:
    """Класс для создания кастомных ботов"""
    trigger_reply_sheet = {'/start': 'Welcome to the UglyBotling|default'}

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
        self.bot = type(name, (CommonBot,), {})  # Создание класса нового бота

    def add_reply(self, trigger: str):
        """Добавление функционала в кастомного бота из словаря trigger_reply_sheet"""
        reply = self.__split(self.trigger_reply_sheet[trigger], '|')
        if reply[1] == 'function':
            pass
        elif reply[1] == 'default':
            pass

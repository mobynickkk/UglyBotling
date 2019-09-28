class NewBot:
    """Для наследования в кастомных ботов"""
    pass


class BotConstructor:
    """Класс для создания кастомных ботов"""
    trigger_answer_sheet = {'/start': 'Welcome to the UglyBotling|default'}

    @staticmethod
    def __split(string, splitter):
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

    def __init__(self, name, trigger_answer_sheet):
        """Каждый экземпляр конструктора создает один класс кастомного бота"""
        self.trigger_answer_sheet = trigger_answer_sheet
        self.bot = type(name, (NewBot,), {})  # Создание класса нового бота

    def add_reply(self, trigger):
        """Добавление функционала в кастомного бота из словаря trigger_answer_sheet"""
        answer = self.__split(self.trigger_answer_sheet[trigger], '|')
        if answer[1] == 'function':
            pass
        elif answer[1] == 'default':
            pass

from .. import *

class Bot:
    trigger_answer_sheet = {'/start': 'Welcome to the UglyBotling|default'}

    @staticmethod
    def split(string, splitter):
        array = string.split(splitter)
        new_array = []
        for i in range(len(array)):
            if array[i] == '\\':
                new_array.append(array[i]+array[i+1])
                i += 1
            else:
                new_array.append(array[i])
        return new_array

    def __init__(self):
        pass

    def reply(self, trigger):
        answer_model = self.trigger_answer_sheet[trigger].split('|')


if __name__ == '__main__':
    print(Bot.split('Hello \| pidor|default', '|'))
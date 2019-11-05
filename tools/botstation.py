from multiprocessing import Process


class BotStation:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, 'instance'):
            cls.instance = super(BotStation, cls).__new__(cls)
        return cls.instance

    def __init__(self):
        self.bots = []

    def add(self, bot):
        self.bots.append(bot)
        process = Process(target=bot.build)
        process.start()
        process.join()

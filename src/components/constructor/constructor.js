import React from 'react';
import './constructor.sass';

class Constructor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bot: {
                meta: {"name": "new_bot", "platforms": "vk, tg"},
                trigger_reply: {}
            },
            command_array: []
        }
    }

    delete_command = (e) => {
      // //e.preventDefault();
      let trigger_reply = Object.assign({}, this.state.bot.trigger_reply);
      let command_array = this.state.command_array;
      delete trigger_reply[e.currentTarget.name.toString()];
      console.log(command_array);
      console.log(e.currentTarget.id);
      command_array.splice(e.currentTarget.id, 1);
      command_array.forEach((el) => {
          if (el.id > e.currentTarget.id)
              el.id--;
      });
      console.log(command_array);
      this.setState({
          bot: {
              meta: this.state.bot.meta,
              trigger_reply: trigger_reply
          },
          command_array: command_array
      });
    };

    render() {
        let commands = [];
        let trigger_reply = this.state.bot.trigger_reply;
        let i = 0;
        for (let trigger in trigger_reply) {
            commands.push(
                <button className="logic__ready__commands" id={i} name={trigger} onClick={this.delete_command}>
                    When you say "{trigger}" it answers "{trigger_reply[trigger].slice(0,-8)}"
                </button>
            );
            i++;
        }
        this.state.command_array = commands;
        return (
            <div className="constructor">
                <form className="meta" onSubmit={async e => {
                    e.preventDefault();
                    const response = await fetch("127.0.0.1:8000/api/create/",
                        {
                            method: "GET",
                            body: JSON.stringify({token: this.props.token, bot: this.state.bot})
                        }
                    );
                    const response_text = await response.text();
                    if (response_text === "Success")
                        this.props.navigate({currentTarget:{name:"navigate__bots"}});
                }}>
                    <button className="navigate" name="navigate__back" onClick={this.props.navigate} />
                    <div className="meta__category">
                        <span className="meta__title">Category</span>
                        <select className="meta__category__select">
                            <option>Standard chat-bot</option>
                        </select>
                    </div>
                    <div className="meta__name">
                        <span className="meta__title">Name</span>
                        <input className="meta__name__name_input" name="name"
                               placeholder="Enter your bot's name" autoComplete="off" />
                        <span className="meta__title">Platforms</span>
                        <div className="meta__checkbox">
                            <div><input name="VK" type="checkbox" /><label className="meta__checkbox__label">VK</label></div>
                            <div><input name="TG" type="checkbox" /><label className="meta__checkbox__label">Telegram</label></div>
                        </div>
                        <span className="meta__title">Method</span>
                        <select className="meta__category__select">
                            <option>Long Polling</option>
                            <option>WebHook</option>
                        </select>
                        <button className="meta__create" onClick={async () => {

                        }}>Create Bot!</button>
                    </div>
                </form>
                <div className="logic">
                    <span className="logic__title">Bot:</span>
                    <div className="logic__ready" id="ready_bot">
                        {this.state.command_array}
                    </div>
                    <div className="logic__add">
                        <form className="logic__add__inner" onSubmit={e => {
                            e.preventDefault();
                            let trigger_reply = Object.assign({}, this.state.bot.trigger_reply);
                            trigger_reply[e.currentTarget.elements.namedItem("trigger").value] = e.currentTarget.elements.namedItem("reply").value.concat("|default");
                            this.setState({bot: {
                                meta: this.state.bot.meta,
                                trigger_reply: trigger_reply
                                }});
                        }}>
                            <input className="meta__name__name_input" name="trigger" placeholder="Enter the message your bot should answer" />
                            <input className="meta__name__name_input" name="reply" placeholder="Enter the answer of your bot" />
                            <button className="logic__add__inner__button">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Constructor;
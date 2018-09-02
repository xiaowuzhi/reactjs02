import React from "react"
import {List, InputItem, NavBar, Icon} from "antd-mobile"
//import io from "socket.io-client"
import {connect} from "react-redux"
import {getMsgList, sendMsg, recvMsg} from "../../redux/chat.redux";
import {getChatId} from "../../util";

//let socket

@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: "", msg: []}
    }

    componentDidMount() {
        //socket = io("ws://192.168.0.108:9093")
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }

        // socket.on("recvmsg",  (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
    }

    handleSubmit() {
        //socket.emit("sendmsg", {text: this.state.text})
        //this.setState({text: ""})

        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({text: ""})
    }

    render() {
        const emoji = ""


        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.match.params.user
        const users = this.props.chat.users
        if (!users[userid]) {
            return null
        }

        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid == chatid)

        return (
            <div className="component-chat" id="chat-page">
                <NavBar
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                    className="fixd-header"
                    mode="dard"
                >
                    {users[userid]["name"]}
                </NavBar>
                {chatmsgs.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from == userid ? (
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>

                    ) : (
                        <List key={v._id}>
                            <Item
                                extra={<img src={avatar}/>}
                                className="chat-me"
                            >{v.content}</Item>
                        </List>
                    )
                })}


                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={<span onClick={() => this.handleSubmit()}>发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>

        )
    }
}

export default Chat
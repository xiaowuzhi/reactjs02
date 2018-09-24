import React from "react"
import {List, InputItem, NavBar, Icon, Grid} from "antd-mobile"
//import io from "socket.io-client"
import {connect} from "react-redux"
import {getMsgList, sendMsg, recvMsg, readMsg} from "../../redux/chat.redux"
import {getChatId} from "../../util"
import QueueAnim from 'rc-queue-anim'

//let socket

@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: "", msg: []}
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }


    }

    componentWillUnmount() {
        const to = this.props.match.params.user
        this.props.readMsg(to)

    }

    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 10)
    }

    handleSubmit() {
        //socket.emit("sendmsg", {text: this.state.text})
        //this.setState({text: ""})

        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text.replace(/(^\s*)|(\s*$)/g, "")
        if (msg) {
            this.props.sendMsg({from, to, msg})
        }
        this.setState({
            text: "",
            showEmoji: false,
        })
    }

    render() {
        const emoji = "😈 👿 👹 👺 💀 👻 👽 😺 😹 😻 😾 😀 😁 😂 😃 😄 😄 😅 😆 😉 😊 😋 😎 😍 😍 😘 🙂 😐 😑 😶 😏 😥 😴 😌 😛 😒 😔 🙁 😤 😱 😠 😇 👟 👢 👡 👒 💄 💼 💍 🌂"
            .split(" ")
            .filter(v => v)
            .map(v => ({text: v}))


        const Item = List.Item
        //const Brief = Item.Brief;
        const userid = this.props.match.params.user
        let users = this.props.chat.users
        if (!users[userid]) {
            this.props.getMsgList()
            users = this.props.chat.users
        }

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

                <div style={{marginTop: "45px", marginBottom: "78px"}}>
                    <QueueAnim type="scale" delay={100}>
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
                                        extra={<img alt="头像" src={avatar}/>}
                                        className="chat-me"
                                    >{v.content}</Item>
                                </List>
                            )
                        })}
                    </QueueAnim>
                </div>


                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight: "15px"}}
                                        onClick={() => {
                                            this.setState({
                                                showEmoji: !this.state.showEmoji
                                            })
                                            this.fixCarousel()
                                        }}
                                    >😊</span>
                                    <span onClick={this.handleSubmit}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji ? <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel
                        onClick={el => {
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}
                    /> : null}

                </div>
            </div>

        )
    }
}

export default Chat
import React from "react"
import {List, Badge} from "antd-mobile"
import {connect} from "react-redux"

@connect(
    state => state,
)
class Msg extends React.Component {
    getLast(arr) {
        return arr[arr.length - 1]
    }

    render() {
        const Item = List.Item
        const Brief = Item.Brief;
        const userid = this.props.user._id
        const userinfo = this.props.chat.users

        //console.log(this.props)
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })

        // console.log([3, 4, 2,6].sort(function(a, b){
        //     return a-b
        // }))
        //console.log(chatList)
        //console.log(Object.values({name:"imooc", age:18}))
        //按照聊天用户分组， 根据chatid

        //2.react16特有的错误处理机制
        //react性能优化
        return (
            <div>
                {chatList.map(v => {
                    const lastItem = this.getLast(v)
                    const targetId = lastItem.from == userid ? lastItem.to : lastItem.from
                    const unreadNum = v.filter(vv => !vv.read && vv.to == userid).length

                    if (!userinfo[targetId]) {
                        return null
                    }
                    const name = userinfo[targetId] ? userinfo[targetId].name : ""
                    let avatar = userinfo[targetId] ? userinfo[targetId].avatar : ""
                    avatar = require(`../img/${avatar}.png`)
                    return (
                        <List key={lastItem._id}>
                            <Item
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={avatar}
                                arrow="horizontal"
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                {lastItem.content}
                                <Brief>{name}</Brief>
                            </Item>
                        </List>

                    )
                })}
            </div>
        )
    }
}

export default Msg

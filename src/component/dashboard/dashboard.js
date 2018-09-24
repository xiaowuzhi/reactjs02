import React from "react"
//import {Switch, Route} from "react-router-dom"
import {Route} from "react-router-dom"
import {connect} from "react-redux"
import {NavBar} from "antd-mobile"
import NavLinkBar from "../../component/navlink/navlink"
import Boss from "../../component/boss/boss"
import Genius from "../genius/genius"
import User from "../../component/user/user"
import Msg from "../../component/msg/msg"
import {getMsgList, recvMsg} from "../../redux/chat.redux"
import QueueAnim from 'rc-queue-anim'


@connect(
    state => state,
    {getMsgList, recvMsg}
)
class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }

    }

    render() {
        const {pathname} = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: "/boss",
                text: "牛人",
                icon: "boss",
                title: "牛人列表",
                component: Boss,
                hide: user.type === "genius"
            },
            {
                path: "/genius",
                text: "BOSS",
                icon: "boss",
                title: "BOSS列表",
                component: Genius,
                hide: user.type === "boss"
            },
            {
                path: "/msg",
                text: "消息",
                icon: "msg",
                title: "消息列表",
                component: Msg
            },
            {
                path: "/me",
                text: "我",
                icon: "user",
                title: "个人中心",
                component: User
            }
        ]
        let oneNavList = navList.find(v => v.path == pathname)
        return (
            <div className="component-dashboard">
                <NavBar className="fixd-header" mode="dard">{oneNavList === undefined ? "" : oneNavList.title}</NavBar>


                <div style={{marginTop: "45px", marginBottom: "78px"}}>
                    <QueueAnim type="scaleX" duration={600}>
                        {
                            oneNavList === undefined ? null :
                                <Route key={oneNavList.path} path={oneNavList.path}
                                       component={oneNavList.component}></Route>

                        }
                    </QueueAnim>
                </div>


                {/*<div style={{marginTop: "45px", marginBottom: "78px"}}>*/}
                {/*<Switch>*/}
                {/*{navList.map(v => (*/}
                {/*<Route key={v.path} path={v.path} component={v.component}></Route>*/}
                {/*))}*/}
                {/*</Switch>*/}
                {/*</div>*/}
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard
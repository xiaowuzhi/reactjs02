import React from "react"
import {Route} from "react-router-dom"
import {connect} from "react-redux"
import {NavBar} from "antd-mobile"
import NavLinkBar from "../../component/navlink/navlink"

function Boss() {
    return <h2>Boss首页</h2>
}

function Genius() {
    return <h2>牛人首页</h2>
}

function Msg() {
    return <h2>消息列表页面</h2>
}

function User() {
    return <h2>个人中心</h2>
}


@connect(
    state => state
)
class Dashboard extends React.Component {
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
                hide: user.type == "genius"
            },
            {
                path: "/genius",
                text: "boss",
                icon: "boss",
                title: "BOSS列表",
                component: Genius,
                hide: user.type == "boss"
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

        return (
            <div>
                <NavBar className='fixd-header' mode="dard">{navList.find(v=>v.path == pathname).title}</NavBar>
                <h2>content</h2>
                {/*<Route path="/boss" component={Boss}></Route>*/}
                {/*<Route path="/genius" component={Genius}></Route>*/}
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard
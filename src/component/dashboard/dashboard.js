import React from "react"
import {Switch, Route} from "react-router-dom"
import {connect} from "react-redux"
import {NavBar} from "antd-mobile"
import NavLinkBar from "../../component/navlink/navlink"
import Boss from "../../component/boss/boss"
import Genius from "../genius/genius"
import User from "../../component/user/user"


function Msg() {
    return <h2>消息列表页面</h2>
}


@connect(
    state => state
)
class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
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
                hide: user.type == "genius"
            },
            {
                path: "/genius",
                text: "BOSS",
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
        let oneNavList = navList.find(v => v.path == pathname)
        return (
            <div className="component-dashboard">
                <NavBar className="fixd-header" mode="dard">{oneNavList === undefined ? "" : oneNavList.title}</NavBar>

                <div style={{marginTop:"45px",marginBottom:"78px"}}>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                {/*<Route path="/boss" component={Boss}></Route>*/}
                {/*<Route path="/genius" component={Genius}></Route>*/}
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard
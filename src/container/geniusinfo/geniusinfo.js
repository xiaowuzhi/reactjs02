import React from "react"
import {
    NavBar,
    InputItem,
    TextareaItem,
    List,
    Button,
    WhiteSpace,
} from "antd-mobile"
import AvatarSelector from "../../component/avatar-selector/avatar-selector"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {update} from "../../redux/user.redux"

@connect(
    state => state.user,
    {update}
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props)
        //this.handleChange = this.handleChange.bind(this)
        this.state = {
            title: '',
            desc: '',
        }
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const path = this.props.location.pathname
        const redirect1 = this.props.redirectTo
        return (
            <div>
                {redirect1 && redirect1 !== path ? <Redirect to={redirect1}></Redirect> : null}
                <NavBar mode="dark">牛人完善信息页</NavBar>
                <AvatarSelector
                    // selectAvatar={this.selectAvatar}
                    selectAvatar={(imgname) => {
                        this.setState({
                            avatar: imgname
                        })
                    }}

                ></AvatarSelector>
                {/*<InputItem onChange={function(v){this.handleChange("user",v)}.bind(this)}>*/}
                <InputItem onChange={(v) => this.handleChange("title", v)}>
                    求职岗位
                </InputItem>

                <List renderHeader={() => <div style={{"fontSize": "17px", "color": "#000"}}>个人简介</div>}>
                    <TextareaItem
                        onChange={(v) => this.handleChange("desc", v)}
                        rows={3}
                        labelNumber={5}
                        autoHeight
                        //count={300}
                    ></TextareaItem>
                </List>
                <WhiteSpace/>
                <Button
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                    type="primary">保存</Button>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
            </div>
        )
    }
}

export default GeniusInfo
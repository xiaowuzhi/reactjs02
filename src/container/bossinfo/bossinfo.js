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

class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        //this.handleChange = this.handleChange.bind(this)
    }

    handleChange(key, val) {
        console.log(val)
        this.setState({
            [key]: val
        })
    }

    render() {
        return (
            <div>
                <NavBar mode="dark">BOOSS完善信息页</NavBar>
                <AvatarSelector
                    // selectAvatar={this.selectAvatar}
                    selectAvatar={(imgname) => {
                        this.setState({
                            avatar: imgname
                        })
                    }}

                ></AvatarSelector>
                {/*<InputItem onChange={function(v){this.handleChange("user",v)}.bind(this)}>*/}
                <InputItem onChange={(v) => this.handleChange("user", v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={(v) => this.handleChange("company", v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={(v) => this.handleChange("money", v)}>
                    职位薪资
                </InputItem>
                <List renderHeader={() => <div style={{"font-size": "17px","color":"#000"}}>职位要求</div>}>
                    <TextareaItem
                        onChange={(v) => this.handleChange("desc", v)}
                        rows={3}
                        labelNumber={5}
                        autoHeight
                        //count={300}
                    ></TextareaItem>
                </List>
                <WhiteSpace/>
                <Button type="primary" >保存</Button>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
            </div>
        )
    }
}

export default BossInfo
import React from "react"
import PropTypes from "prop-types"
import {Card, WingBlank, WhiteSpace} from "antd-mobile"

class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }

    render() {

        return (
            <WingBlank size="lg">
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v => (
                    v.avatar ? <Card key={v._id}>
                        <Card.Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        />
                        <Card.Body>
                            {v.type === "boss" ? <div>公司：{v.company}</div> : null}
                            <div>
                                {v.desc.split("\n").map(d => (
                                    <div key={d}>{d}</div>
                                ))}
                            </div>
                            {v.type === "boss" ? <div>薪资：{v.money}</div> : null}
                        </Card.Body>

                    </Card> : null
                ))}
            </WingBlank>
        )
    }

}

export default UserCard
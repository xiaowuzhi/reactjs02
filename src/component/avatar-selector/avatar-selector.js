import React from "react"
import {Grid, List, Result} from 'antd-mobile'
import PropTypes from "prop-types"

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {}

    }

    render() {
        const avatarList = ["boy", "girl", "man", 'woman', 'bull', 'chick', 'crab', 'hedgehog', 'hippopotamus', 'koala', 'lemur', 'pig', 'tiger', 'whale', 'zebra']
        //const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        //  .split(',')
            .map(v => ({
                icon: require(`../img/${v}.png`),
                text: v
            }))
        let isxuanimg = "请选择头像"
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt=""/>;
        let img1
        if (this.state.icon) {
            img1 = myImg(this.state.icon)
            isxuanimg = <div className="spexia02">已选择: {this.state.text}</div>
        } else {
            img1 = ""
            isxuanimg = <div className="spexia01">请选择头像</div>
        }
        return (
            <div className="result-example">
                <List>
                    <Result
                        img={img1}
                        title={isxuanimg}
                        //message={<div>998.00元 <del>1098元</del></div>}
                    />
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={_elm => {
                            this.setState(_elm)
                            this.props.selectAvatar(_elm.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector
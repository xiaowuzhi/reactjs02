import React from 'react'
import {Button, List} from 'antd-mobile'

//import "antd-mobile/dist/antd-mobile.css"

class App extends React.Component {
    render() {
        const boss = "李云龙"
        return (
            <div>
                <h2>独立团，团长{boss}</h2>
                <Yiying laoda="张大喵"></Yiying>
                <Qibinglian laoda={"孙德胜"}></Qibinglian>
            </div>
        )
    }
}


function Qibinglian(props) {
    return <h2>骑兵连连长， {props.laoda}, 冲啊</h2>
}

class Yiying extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            solders: ['虎子', "柱子", "王根生"]
        }
        //this.addSolder = this.addSolder.bind(this)
    }

    componentWillMount() {
        console.log("组件马上就要加载了")
    }

    componentDidMount() {
        console.log("组件加载完毕")

    }

    //addSolder() {
    addSolder = () => {
        console.log("hello add solder")
        this.setState({
            solders: [...this.state.solders, '新兵蛋子' + Math.random()]
        })
    }

    render() {
        console.log("组件正在加载")
        //const Item = List.Item;
        return (
            < div>
                < h2> 一营营长， {this.props.laoda}
                </h2>
                {/*<button onClick={this.addSolder}>新兵入伍</button>*/
                }
                <Button type="primary" onClick={() => this.addSolder()}>新兵入伍</Button>
                <List renderHeader={() => '士兵列表'} className="my-list">
                    {this.state.solders.map(v => <List.Item key={v}>{v}</List.Item>)}
                </List>
            </div>
        )
    }
}


export default App
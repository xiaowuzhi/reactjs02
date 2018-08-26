import React from "react"
import {Button} from 'antd-mobile'

import {connect} from "react-redux"
import {addGun, removeGun, addGunAsync} from "./index.redux"

//
// class App extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {}
//     }
//     render() {
//         // const store = this.props.store
//         // const num = store.getState()
//         const num = this.props.num
//         const addGun = this.props.addGun
//         const removeGun = this.props.removeGun
//         const addGunAsync = this.props.addGunAsync
//
//         return (
//             <div>
//                 <h1>现在有机枪{num}把</h1>
//                 <Button type="primary" onClick={addGun}>申请武器</Button>
//                 <Button type="primary" onClick={removeGun}>上交武器</Button>
//                 <Button type="primary" onClick={addGunAsync}>拖两天再给</Button>
//             </div>
//         )
//     }
// }


// const mapStatetoProps = (state) => {
//     return {num: state}
// }
// const actionCreators = {addGun, removeGun, addGunAsync}
// //App = connect(mapStatetoProps, actionCreators)(App)
// @connect(mapStatetoProps, actionCreators)

@connect(
    //你要state什么属性放到props里
    state => ({num: state}),
    //你要什么方法,放到props里，自动dispatch
    {addGun, removeGun, addGunAsync}
)
class App extends React.Component {
    render() {
        return (
            <div>
                <h1>现在有机枪{this.props.num}把</h1>
                <Button type="primary" onClick={this.props.addGun}>申请武器</Button>
                <Button type="primary" onClick={this.props.removeGun}>上交武器</Button>
                <Button type="primary" onClick={this.props.addGunAsync}>拖两天再给</Button>
            </div>
        )
    }
}


export default App
import React from "react"

import {addGUN} from "./index.redux"

import {Button} from 'antd-mobile'


class App extends React.Component {
    constructor() {
        super()
    }


    render() {
        const store = this.props.store
        const num = store.getState()

        return (
            <div>
                <h1>现在有机枪{num}把</h1>
                <Button type="primary" onClick={() => store.dispatch(addGUN())}>申请武器</Button>
            </div>
        )
    }
}


export default App
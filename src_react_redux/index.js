import React from "react"
import ReactDom from "react-dom"
import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import {Provider} from "react-redux"

import App from "./App"
//import {counter, addGun, removeGun, addGunAsync} from "./index.redux"
import {counter} from "./index.redux"

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f=>f

//const store = createStore(counter)

// const store = createStore(counter, compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension ? window.devToolsExtension : () => {
//     }
// ))

// //不使用 reduxDevtools chrome调试工具
// const store = createStore(
//     counter,
//     applyMiddleware(thunk)
// )


//使用 reduxDevtools chrome调试工具
const store = createStore(counter, compose(
    applyMiddleware(thunk),
    reduxDevtools
))




// function render() {
//     ReactDom.render(<App store={store} addGunAsync={addGunAsync} addGun={addGun}
//                          removeGun={removeGun}/>, document.getElementById("root"))
// }
//
// render()
//
// store.subscribe(render)


ReactDom.render(
    (<Provider store={store}>
        <App/>
    </Provider>),
    document.getElementById("root")
)













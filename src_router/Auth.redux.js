import axios from 'axios'


import 'axios'
import {Toast} from 'antd-mobile'


const axiosIns = axios.create()

// 拦截请求
axiosIns.interceptors.request.use(function (config) {
    Toast.loading('加载中', 0)
    return config
})
// 拦截相应
axiosIns.interceptors.response.use(function (config) {
    setTimeout(() => {
        Toast.hide()
    }, 2000)

    return config
})


const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'
const initState = {
    isAuth: false,
    user: '李云龙',
    age: 20
}


export function auth(state = initState, action) {
    console.log(state, action)
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true}
        case LOGOUT:
            return {...state, isAuth: false}
        case USER_DATA:
            return {...state, user: action.payload.user, age: action.payload.age}
        default:
            return state
    }
}

// action
export function getUserData() {
    // dispatch用来通知数据修改
    return dispatch => {
        axiosIns.get('/data')
            .then(res => {
                if (res.status === 200) {
                    dispatch(userData(res.data))
                }
            })
    }
}

export function userData(data) {
    return {type: USER_DATA, payload: data}
}

export function login() {
    return {type: LOGIN}
}

export function logout() {
    return {type: LOGOUT}
}

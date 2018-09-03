



import React from "react"

class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num :1
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState({
            num: this.state.num + 1
        })
    }

    render() {
        return(
            <div>
                <p>{num}</p>
                <button onClick={this.handleClick}>click</button>
            </div>
        )
    }
}




export default Demo
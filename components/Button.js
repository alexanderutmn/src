import React, {Component} from 'react';

class Button extends Component {

    constructor(props){
        super(props)

    }

    render(){
        const {classname, eventClick, text} = this.props
        return(
            <button className={classname} onClick={eventClick}>{text}</button>
        )
    }

}

export default Button

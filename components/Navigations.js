import React, {Component} from 'react';


class Navigations extends Component {

    constructor(props){
        super(props)

        this.state = {
            currentButton: 0
        }

        this.needButtons = [
            {
                "classname" : "btn btn-default btn-lg",
                "days" : -1,
                "text" : "Все"
            },
            {
                "classname" : "btn btn-default btn-lg",
                "days" : 0,
                "text" : "На сегодня"
            },
            {
                "classname" : "btn btn-default btn-lg",
                "days" : 1,
                "text" : "На завтра"
            },
            {
                "classname" : "btn btn-default btn-lg",
                "days" : 7,
                "text" : "На неделю"
            },
            {
                "classname" : "btn btn-default btn-lg",
                "days" : 30,
                "text" : "На месяц"
            }
        ]
    }

    render(){
        return(
            <div className="navigations">
                {this.renderButtons()}
            </div>
        )
    }

    renderButtons = () => {
        const {needButtons} = this,
            {currentButton} = this.state
        return needButtons.map((button, index) =>
            <button
                key={index}
                data-index={index}
                data-group={button.days}
                className={button.classname}
                onClick={this.groups.bind(this)}
                disabled={ currentButton == index ? 'disabled' : '' }
            >
                {button.text}
            </button>
        )
    }

    groups = (e) => {
        const {onGroupClick} = this.props
        onGroupClick(e.target.dataset.group)
        this.setState({
            currentButton: e.target.dataset.index
        })
    }
}


export default Navigations

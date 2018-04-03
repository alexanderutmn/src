import React, {Component} from 'react';

class Task extends Component {

    constructor(props){
        super(props)
    }

    render(){
        const {task, removeTask, editTask} = this.props
        return(
            <div className="col-sm-6">
                <div className="card">
                    {task.important ? <div className="card__important">!</div> : ''}
                    <div className="card-header">
                        <h2 >
                            {task.title}
                            {task.important}
                            <button className="btn btn-danger float-right" onClick={removeTask} data-id={task.id}>delete</button>
                            <button className="btn btn-primary float-right" onClick={editTask} data-id={task.id}>edit</button>
                        </h2>
                    </div>
                    <div className="card-body">
                        <h6 className="card-subtitle text-muted">Date: {task.timetask}</h6>
                        <section className="card-text">{task.text}</section>
                    </div>
                    <div className="card-footer">
                        {this.renderPeople(task.people)}
                    </div>
                </div>
            </div>
        )
    }

    renderPeople = (people) => {
        return people.map((man, index) => {
            return (<span key={'man-'+index}>{man.text}</span>)
        })
    }
}


export default Task

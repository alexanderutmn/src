import React, {Component} from 'react';
import TaskList from './TaskList'
import Navigations from './Navigations'
import Tasks from '../fixtures'
import ModalForm from './ModalForm'
import '../css/css.css'
import 'bootstrap/dist/css/bootstrap.css'


class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            group: -1,
            openModal: false,
            editTask: null
        }

        localStorage.setItem('Tasks', JSON.stringify(Tasks));

    }
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">
                        TODO list
                    </h1>
                    <button onClick={this.openModal.bind(this)}>create</button>
                </div>
                <Navigations
                    onGroupClick={this.onGroupClick.bind(this)}
                />
                <TaskList
                    tasks={this.filterBy(JSON.parse(localStorage.getItem('Tasks')), 'timetask', new Date())}
                    removeTask={this.handleRemoveTask.bind(this)}
                    editTask={this.handleEditTask.bind(this)}
                />
                <ModalForm
                    open={this.state.openModal}
                    onCloseModal={this.closeModal.bind(this)}
                    task={this.state.editTask}
                    onSubmit={this.onSubmitForm.bind(this)}
                />
            </div>
        )
    }
    
    onSubmitForm = () => {
        
    }

    onGroupClick = (group) => {
        this.setState({
            group: group
        })
    }

    openModal = () => {
        this.setState({
            openModal: true
        })
    }

    closeModal = () => {
        this.setState({
            openModal: false,
            editTask: null
        })
    }

    filterBy = (data, field, today) => {
        var g = this.state.group

        if(g == -1)
            return data

        return data.filter(item => {
            var d = new Date(item[field]),
                razn = Math.floor((d-today) / (1000 * 60 * 60 * 24))
            var day = razn === -0 ? 0 : razn

            return (day <= g && d.getDay() >= today.getDay())
        })
    }

    handleRemoveTask = (e) => {
        var id = e.target.dataset.id,
            tasks = JSON.parse(localStorage.getItem("Tasks"))

        var index = tasks.findIndex((item) => {
            return item.id == id
        })

        tasks.splice(index, 1)

        localStorage.setItem("Tasks", JSON.stringify(tasks))

        this.setState({
            group: this.state.group
        })

    }

    handleEditTask = (e) => {
        var id = e.target.dataset.id,
            tasks = JSON.parse(localStorage.getItem("Tasks"))

        var index = tasks.findIndex((item) => {
            return item.id == id
        })

        this.setState({
            editTask: tasks[index],
            openModal: true
        })
    }

}

export default App
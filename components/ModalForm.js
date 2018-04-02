import React, {Component} from 'react';

class ModalForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            important: false,
            timetask: '',
            text: '',
            people: '',
            id: null
        }

        this.idEditTask = null

        this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);


    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.task)
            this.setState({
                title: nextProps.task.title,
                important: nextProps.task.important,
                timetask: nextProps.task.timetask,
                text: nextProps.task.text,
                people: nextProps.task.people,
                id: nextProps.task.id
            });
        else
            this.setState({
                title: '',
                important: false,
                timetask: '',
                text: '',
                people: '',
                id: null
            })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // onCloseModal = () => {
    //     const {onCloseModal} = this.props
    //     this.setState({
    //         title: '',
    //         important: '',
    //         timetask: '',
    //         text: '',
    //         people: '',
    //         id: null
    //     })
    //     onCloseModal()
    // }

    handleSubmit = (e) => {
        e.preventDefault()
        const {handleSubmit} = this.props
        handleSubmit(this.state)
    }
    

    render() {
        const {open, handleSubmit, onCloseModal} = this.props
        return (
            <div className="modal-form" style={{'display': open ? 'block' : 'none' }}>
                <div className="modal-form__background" onClick={onCloseModal}>

                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">
                            title
                        </label>
                        <input name="title" type="text" className="form-control" value={this.state.title} onChange={this.handleInputChange}/>

                    </div>

                    <div className="form-group">
                        <label htmlFor="">
                            timetask

                        </label>
                        <input name="timetask" type="date" className="form-control" value={this.state.timetask}
                               onChange={this.handleInputChange}/></div>
                    <div className="form-group">
                        <label htmlFor="">
                            text
                        </label>
                        <textarea className="form-control" value={this.state.text} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">
                            people

                        </label>
                        <input name="people" type="text" className="form-control" value={this.state.people}
                               onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-check">

                        <input name="important" className="form-check-input" type="checkbox" checked={ this.state.important ? 'checked' : ''}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="" className="form-check-label">
                            important
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}


export default ModalForm

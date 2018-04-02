import React, {Component} from 'react';

class ModalForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            important: '',
            timetask: '',
            text: '',
            people: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.task)
            this.setState({
                title: nextProps.task.title,
                important: nextProps.task.important,
                timetask: nextProps.task.timetask,
                text: nextProps.task.text,
                people: nextProps.task.people
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onCloseModal = () => {
        const {onCloseModal} = this.props
        this.setState({
            title: '',
            important: '',
            timetask: '',
            text: '',
            people: ''
        })
        onCloseModal()
    }

    handleSubmit = (e) => {
        console.log(this.state)
        e.preventDefault()
        
    }
    

    render() {
        const {open} = this.props
        return (
            <div className="modal-form" style={{'display': open ? 'block' : 'none' }}>
                <div className="modal-form__background" onClick={this.onCloseModal}>

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
                        <input name="timetask" type="text" className="form-control" value={this.state.timetask}
                               onChange={this.handleInputChange}/></div>
                    <div className="form-group">
                        <label htmlFor="">
                            text
                        </label>
                        <input name="text" type="text" className="form-control" value={this.state.text} onChange={this.handleInputChange}/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="">
                            people

                        </label>
                        <input name="people" type="text" className="form-control" value={this.state.people}
                               onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-check">

                        <input name="important" className="form-check-input" type="checkbox" value={this.state.important}
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

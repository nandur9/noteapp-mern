import React, { Component } from 'react';
import './CreateNote.css';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";

export default class CreateNote extends Component {
    
    state= {
        users: [],
        userSelected:'',
        title: '',
        content:'',
        cardDate : new Date(),
        state: 'todo'
    }

    
    componentDidMount(){
        this.getUsers();
    }
    


    getUsers = async ()=>{
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({users: res.data});
        this.setState({
            userSelected: res.data[0].userName + ' (' + res.data[0].userTeam + ')'  // para que tome el primer usuario sin ser seleccionado, por defecto no viene asignado
        });
    }
    
    
    
    onSubmit = async (e)=>{
        e.preventDefault();

        await axios.post('http://localhost:4000/api/notes', {
            title: this.state.title,
            content: this.state.content,
            author: this.state.userSelected,
            date: this.state.cardDate,
            state: this.state.state
        })

        document.getElementById("form").reset();
        window.location.href= '/';
    }


    onInputChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value 
            
        });
        console.log(e.target.value);
    }


    onChangeDate = (date)=>{
        this.setState({
            cardDate: date
        });
    }
    
    render() {
        return (
            <div className='col-md-6 offset-md-3'>
                <div className="card card-body container">
                    <h4>NEW NOTES:</h4>
                    <form onSubmit={this.onSubmit} id='form'>
                        <div className="form-group">
                        <label htmlFor="optionUsers">UserID</label>
                            <select id='optionUsers' className='form-control' name='userSelected' onChange={this.onInputChange}>
                                {
                                    this.state.users.map(user =>
                                        <option key={user._id} value={user.userid + ' (' + user.password + ')'}> 
                                        {user.userid} - {user.userpassword} 
                                        </option>
                                    )
                                }
                            </select>
                        </div>

                        <label htmlFor="taskTitle"> Task title:</label>
                        <div className="form-group">
                            <input type="text" id='taskTitle' className="form-control" onChange={this.onInputChange} name='title' placeholder=' Task title'  required/>
                        </div>

                        <label htmlFor="content"> Task description:</label>
                        <div className="form-group">
                            <textarea  id='content' className='form-control' onChange={this.onInputChange} name="content" placeholder='Task content' required/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="DatePicker">Done date:</label>
                            <DatePicker id='DatePicker' className='form-control' selected={this.state.cardDate} onChange={this.onChangeDate} />
                        </div>

                    <button type="submit" className='btn btn-primary'> LOGIN</button>
                    </form>
                </div>
                
            </div>
        )
    }
}

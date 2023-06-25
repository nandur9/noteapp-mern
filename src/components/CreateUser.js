import React, { Component } from 'react';
import axios from 'axios';
import'./CreateUser.css';

export default class CreateUser extends Component {


        state = {
            users:[],
            userName:'',
            userTeam:''
        }


    async componentDidMount(){

        this.getUsers();
    }


    
    getUsers = async ()=>{
        const res = await axios.get('http://localhost:4000/api/users');

        this.setState({users: res.data});

        this.setState({userName:'', userTeam:''});
    }

    onChangeUserName = (e)=>{
        this.setState({userName: e.target.value});
        console.log(e.target.value);
    }
    onChangeUserTeam = (e)=>{
        this.setState({userTeam: e.target.value});
        console.log(e.target.value);
    }

    onSubmit = async (e)=>{
        
        e.preventDefault();

        const res = await axios.post('http://localhost:4000/api/users', 
        {
            userName: this.state.userName,
            userTeam: this.state.userTeam
        });
        
        
        this.getUsers();
        console.log(res);
        
    }

    deleteUser = async(id)=>{
        console.log('User id:' + id + ' was deleted.');

        await axios.delete('http://localhost:4000/api/users/'+id);

        this.getUsers();

    }




    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                            <h3>CREATE A NEW ACCOUNT</h3>

                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                            <label htmlFor="formUserName">User id</label>
                                <input id="formUserName" type="text" value={this.state.userName} className="form-control" onChange={this.onChangeUserName} />
                            </div>
                            <div className="form-group">
                            <label htmlFor="formUserTeam">Password</label>
                                <input id="formUserTeam" type="text" value={this.state.userTeam} className="form-control" onChange={this.onChangeUserTeam} />
                            </div>
                            <button type='submit' className='btn btn-primary'>
                                LOGIN
                            </button>
                        </form>
                        
                    </div>
                </div>
                
                <div className="col-md-4">
                <h3 className='color-white'>SHOWING NOTES </h3>
                <p className='color-white'>To Edit an Notes, press doubleclick on save.</p>
                    <ul className="list-group">
                        {
                            this.state.users.map((user) =>(
                                <li className='list-group-item list-group-item-action' key={user._id} onDoubleClick={()=> this.deleteUser(user._id)}>
                                {user.userName} - {user.userTeam}
                                </li>)      
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

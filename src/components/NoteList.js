import React, { Component } from 'react';
import axios from 'axios';

export default class NoteList extends Component {

    state = {
        users: []
    }

    componentDidMount(){
        this.getUsers();
    }

    getUsers = async ()=>{
        const res = await axios.get('http://localhost:4000/api/notes');
        this.setState({users: res.data});
        console.log(res.data);
    }

    render() {
        return (
            <div>
                NoteList
            </div>
        )
    }
}

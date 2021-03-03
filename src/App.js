import React, { Component } from 'react'
import axios from 'axios';
import Tab from './Dropdown'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
          users: [],
          isLoading: false,
          isError: false
        }
      }

     componentDidMount() {
        axios.get('https://raw.githubusercontent.com/accuknox/TrainingAPI/main/large.json')
        .then(res=>{
            console.log(res);
            this.setState({users:res.data})
        })
    } 

    renderTableHeader = () => {
        if(this.state.users.length != 0)
            return Object.keys(this.state.users[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
      }

      renderTableRows = () => {
        return this.state.users.map(user => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.location}</td>
              <td>{user.date}</td>
              <td>{user.salary}</td>
            </tr>
          )
        })
      }
    
    

    render(){
        return(
            <div>
            <Tab/>
            <table>
                <thead>
                    <tr>
                        {this.renderTableHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.renderTableRows()}
                </tbody>

            </table>
            </div>
          
        )
    }
}

export default Table;
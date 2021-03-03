import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
const options = [
    { key: 1, text: 'Small', value: 'small' },
    { key: 2, text: 'Medium', value: 'medium' },
    { key: 3, text: 'Large', value: 'large' },
  ]

class Tab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          users: [],
          isLoading: false,
          isError: false
        }
      }

changeTitle (e,data) {
    // console.log(data);
    axios.get(`https://raw.githubusercontent.com/accuknox/TrainingAPI/main/${data.value}.json`)
    .then(res=>{
        this.setState({users:res.data});

    })
}
// componentDidMount() {
//     axios.get('https://raw.githubusercontent.com/accuknox/TrainingAPI/main/large.json')
//     .then(res=>{
//         console.log(res);
//         this.setState({users:res.data})
//     })
// } 


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
        <Dropdown clearable options={options} selection onChange={this.changeTitle.bind(this)}/>
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
export default Tab;
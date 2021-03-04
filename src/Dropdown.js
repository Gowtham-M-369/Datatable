import React from 'react'
import './Dropdown.css'
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
          isError: false,
          keyword:'',
          currentpage:1,
          postperpage:10
        }
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick(event) {
        this.setState({
          currentpage: Number(event.target.id)
        });
      }

change=a=>this.setState({keyword:a.target.value})

changeTitle (e,data) {
    // console.log(data);
    axios.get(`https://raw.githubusercontent.com/accuknox/TrainingAPI/main/${data.value}.json`)
    .then(res=>{
        this.setState({users:res.data});

    })
}
componentDidMount() {
    axios.get('https://raw.githubusercontent.com/accuknox/TrainingAPI/main/small.json')
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
      let displayList = []
      if(this.state.keyword != '') {
        let filterResults = this.state.users.filter(name=>{
            console.log(name.firstName.includes(this.state.keyword));
            console.log(name.lastName.includes(this.state.keyword));
            return name.firstName.toLowerCase().includes(this.state.keyword.toLowerCase()) |  name.lastName.toLowerCase().includes(this.state.keyword.toLowerCase())     
        });
        console.log(filterResults);
         displayList = filterResults;
      } else {
            displayList = this.state.users;
    }
    const indexofLastPost=this.state.currentpage *this.state.postperpage;
    const indexoffirstpost=indexofLastPost-this.state.postperpage;
    const currentposts=displayList.slice(indexoffirstpost,indexofLastPost);

  
    return currentposts.map(user => {
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
 
//  const indexofLastPost=currentpage * postperpage;
// const indexoffirstpost=indexofLastPost-postperpage;
//  const currentposts=posts.slice(indexoffirstpost,indexofLastPost);
render(){


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.users.length / this.state.postperpage); i++) {
      pageNumbers.push(i);
     
    }
    console.log(pageNumbers);
    const renderPageNumbers = pageNumbers.map(number => {
        return (
       
          <li style={{listStyleType:"none",display:'inline',backgroundColor: 'dodgerblue',width:'200px',margin:'0px',textAlign:'center',fontSize:'30px'
                      ,lineHeight:"75px",border: "1px solid black",padding:"5px"}}
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            
            {number}
          </li>
     
        );
      });


    return(
        <div> <span>show</span><Dropdown clearable options={options} selection onChange={this.changeTitle.bind(this)}/> <span>Entities</span>
        <div style={{paddingLeft:'1350px'}} >
        <input type='text' placeholder="Search..." onChange={this.change}/>
        </div>
        <div class="table">
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
        {/* {renderTodos} */}
        {renderPageNumbers}
        </div>    
  )
}
}
export default Tab;
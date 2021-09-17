import './App.css';
import Table from '../src/components/table';
import React, { Component } from 'react';
import { ceil } from 'lodash';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       friendsList : [{
         name:'Viswanath',
         isFavourite:true,
         isActive:true
       },{
         name:'Sreenivas',
         isFavourite:true,
         isActive:true
       }],
       addFriendName:'',
       currentFriendList:[]
    }
  }

  addFriend = () => {
    const friends = this.state.friendsList;
    friends.push({
      name:this.state.addFriendName,
      isFavourite:false,
      isActive:false
    });
    this.setState({friendsList:friends,addFriendName:'',currentFriendList:this.state.friendsList.slice(0,4)});
  }

  addToFavourite = (index) => {
    const friends = this.state.friendsList;
    friends[index].isFavourite = !friends[index].isFavourite;
    this.setState({friendsList:friends});
  }

  componentDidMount() {
    if(this.state.friendsList.length<=4) {
      console.log("here it is");
      this.setState({
        currentFriendList:this.state.friendsList
      })
    }
  }

  changePage = (page) => {
    console.log("clicked page",page);
    const updateFriendList = this.state.friendsList.slice((page-1)*4,page*4);
    this.setState({currentFriendList:updateFriendList});
  }
  
  render() {
    const {friendsList,currentFriendList} = this.state;
    const pages = ceil(friendsList.length/4);
    let page = [];
    if(friendsList.length > 4) {
      for(let i=1;i<=pages;i++) {
        page.push(<button key={i} onClick={()=>this.changePage(i)}>{i}</button>)
      }
    }
    
    return (
      <div className="App">
      <header className="App-header">  
      <div>
        <label htmlFor="fname" style={{fontSize:'13px'}}>Friend Name:</label>
        <input type="text" placeholder="Enter Friend Name" name="fname" onChange={(e)=>{this.setState({addFriendName:e.target.value})}}/>
        <button onClick={()=>this.addFriend()}>Add Friend</button>
        <h1>Your Friends List</h1>
        <br/>
        <Table bordered>
          <tbody>
            {currentFriendList.map((item,index)=>{
              return (
                <tr style={{borderBottom:'1px solid black'}} key={index}>
                  <td>
                    <div>
                      <span>{item.name}</span>
                      <button style={{float:'right'}}>Delete</button>
                      <button style={{float:'right'}}>Add Favourite</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {friendsList.length > 4 && page.map((item,index)=>{
          return item;
        })}
      </div>
      </header>
    </div>
    )
  }
}

export default App

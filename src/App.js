import logo from './logo.svg';
import './App.css';
import Table from '../src/components/table';
import React, { Component } from 'react'

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
       addFriendName:''
    }
  }

  addFriend = () => {
    const friends = this.state.friendsList;
    friends.push({
      name:this.state.addFriendName,
      isFavourite:false,
      isActive:false
    });
    this.setState({friendsList:friends});
  }

  addToFavourite = (index) => {
    const friends = this.state.friendsList;
    friends[index].isFavourite = !friends[index].isFavourite;
    this.setState({friendsList:friends});
  }
  
  render() {
    const {friendsList} = this.state;
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
            {friendsList.map((item,index)=>{
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
      </div>
      </header>
    </div>
    )
  }
}

export default App

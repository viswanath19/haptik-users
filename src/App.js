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
       currentFriendList:[],
       currentPage:1,
       searchFriend:'',
       isSearchActive: false
    }
  }

  addFriend = () => {
    const friends = this.state.friendsList;
    const newFriend = [];
    newFriend.push({
      name:this.state.addFriendName,
      isFavourite:false,
      isActive:false
    });
    this.setState({friendsList:[...newFriend,...friends]},()=>{
      this.setState({currentFriendList:this.state.friendsList.slice(0,4)});
    });
  }

  addToFavourite = (index) => {
    const friends = this.state.friendsList;
    const favouriteIndex = index + (this.state.currentPage-1)*4;
    friends[favouriteIndex].isFavourite = !friends[favouriteIndex].isFavourite;
    console.log(friends);
    this.setState({friendsList:friends});
    this.updateCurrentPage();
  }

  deleteItem = (index) => {
    const friends = this.state.friendsList;
    const deleteIndex = (this.state.currentPage-1)*4;
    friends.splice(deleteIndex+index,1);
    console.log(friends);
    this.setState({friendsList:friends});
    this.updateCurrentPage();
  }

  updateCurrentPage = () => {
    const {friendsList,currentPage} = this.state;
    if(this.state.friendsList.length > 4) {
      const updateFriendList = friendsList.slice((currentPage-1)*4,currentPage*4);
      this.setState({currentFriendList:updateFriendList});
    }
    else {
      this.setState({currentFriendList:this.state.friendsList,currentPage:1});
    }
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
    this.setState({currentFriendList:updateFriendList,currentPage:page});
  }

  searchFriend = () => {
    console.log("searchName",this.state.searchFriend);
    const search_str = this.state.searchFriend.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    const searchFriendList = this.state.friendsList.filter(friend=>friend.name.match(new RegExp(search_str, 'gi')));
    this.setState({
      currentFriendList:searchFriendList,
      isSearchActive: true
    })
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
        <input type="text" className={"addName"} placeholder="Enter Friend Name" name="fname" onChange={(e)=>{this.setState({addFriendName:e.target.value})}} onKeyDown={(e) => {
          console.log(e);
          if (e.key === "Enter" && this.state.addFriendName.trim().length > 0) {
            this.addFriend();
          }
        }}/>
        <h1>Your Friends List</h1>
        <br/>
        <div style={{border:'1px solid black',borderBottom:'none',width:'100%'}}>
        <input type="text" className={"search-box"} placeholder="Search Friend By Name" name="sname" onChange={(e)=>{this.setState({searchFriend:e.target.value})}} onKeyDown={(e) => {
          console.log(e);
          if (e.key === "Enter" && this.state.searchFriend.trim().length > 0) {
            this.searchFriend();
          }
        }}/>
        </div>
        <Table bordered>
          <tbody>
            {currentFriendList.map((item,index)=>{
              return (
                <tr className={"table-row-col"} key={index}>
                  <td className={"table-col"}>
                    <div>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className={"table-col"}>
                    <button className={"fav-button"} onClick={()=>this.addToFavourite(index)}>
                        {!item.isFavourite && <i className="fa fa-star-o"/>}
                        {item.isFavourite && <i className="fa fa-star"/>}
                    </button>
                    <button className={"delete-button"} onClick={()=>this.deleteItem(index)}><i className="fa fa-trash"/></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {!this.state.searchFriend && friendsList.length > 4 && page.map((item,index)=>{
          return item;
        })}
      </div>
      </header>
    </div>
    )
  }
}

export default App

import logo from './logo.svg';
import './App.css';
import Table from '../src/components/table';
import React, { Component } from 'react'

export class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">  
      <div>
        <h1>Your Friends List</h1>
        <br/>
        <Table bordered>
          <tbody>
            <tr style={{borderBottom:'1px solid black'}}>
              <td>
                <div>
                  <span>Bharat</span>
                  <button style={{float:'right'}}>Delete</button>
                  <button style={{float:'right'}}>Add Favourite</button>
                </div>
              </td>
            </tr>
            <tr style={{borderBottom:'1px solid black'}}>
              <td>
                <div>
                  <span>Bharat</span>
                  <button style={{float:'right'}}>Delete</button>
                  <button style={{float:'right'}}>Add Favourite</button>
                </div>
              </td>
            </tr>
            <tr style={{borderBottom:'1px solid black'}}>
              <td>
                <div>
                  <span>Bharat</span>
                    <button style={{float:'right'}}>Delete</button>
                    <button style={{float:'right'}}>Add Favourite</button>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      </header>
    </div>
    )
  }
}

export default App

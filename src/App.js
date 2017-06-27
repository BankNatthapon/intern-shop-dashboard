import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ome from './OME.jpg'
import logo_NF from './logo_NF.png'
import { Table, Panel, Button } from 'react-bootstrap'

let i = 1
let panel_title = "Bill";

class App extends Component {
  constructor(){
   super()
   this.state={
     store: [],
     total: 0
   }
 }

 componentDidMount() {
   fetch('http://localhost:3000/api/getBillList')
      .then(response => response.json())
      .then(json => this.setState({ store: json }))
 }

 handleBillLists(){
     let temp = []
     for (let i = 0; i < this.state.store.length; i++){

       for (let j = 0; j < this.state.store[i].bill.length; j++){
         console.log(this.state.store[i].bill.length);
         let nameitem = this.state.store[i].bill[j].name
         let priceitem = this.state.store[i].bill[j].price
         let countitem = this.state.store[i].bill[j].count
           temp =  [...temp, {name: nameitem, price: priceitem, count: countitem}]
       }
     }

     this.setState({billLists: temp})
     this.showItem.bind(this)
 }

 handleDeleteAll() {
   fetch('http://localhost:3000/api/deleteBill')
      .then(response => response.json())
      .then(() => this.setState({ store : [] }))
 }

 showItem(){
   for(let i = 0; i < this.state.billLists.length; i++) {
     console.log(this.state.billLists[i].name + " : " + this.state.billLists[i].price)
   }
 }

 render() {
   return (
     <div>
       <div className="App">

         <div className="App-header">
           <img src={logo_NF} className="App-logo" alt="logo" />
           <h2>Bill Lists</h2>
         </div>

        <div className="BillList container">

        {this.state.store.map((record, index) =>
            <Panel header={panel_title + " " + i++} bsStyle="info">
              <Table className="Bill" striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>รายการ</th>
                    <th>จำนวน</th>
                    <th>รวมเป็นเงิน</th>
                  </tr>
                </thead>

                {record.bill.map((record2, index) =>
                <tbody>
                  <tr>
                    <td>{index+1}</td>
                    <td>{record2.name}</td>
                    <td>{record2.count}</td>
                    <td>{record2.price}</td>
                    <td hidden>{this.state.total += record2.price}</td>
                  </tr>
                </tbody>

              )}
                <tr>
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td>{this.state.total}</td>
                </tr>
              </Table>
                <div hidden>{this.state.total = 0}</div>
            </Panel>
          )}

        </div>
        <Button bsStyle="danger" onClick={this.handleDeleteAll.bind(this)}>Delete Bills All</Button>
      </div>
     </div>
   );
 }
}

export default App;

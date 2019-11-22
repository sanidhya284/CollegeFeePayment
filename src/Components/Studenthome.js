import React from 'react';
import { logouts, getTokens } from '../utils';
import Style from './css/Studenthome.module.css';
import Axios from 'axios';
class Studenthome extends React.Component  {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.reset = this.reset.bind(this);
    this.pay = this.pay.bind(this);
    this.state = {
      admno: '',
      name: '',
      programme: '',
      sem: '',
      dept: '',
      schol: '',
      deadline: '',
      paid: '',
      fine: ''
    };
  };
  componentDidMount() { 
    let config = {
      headers: {
        Authorization: 'bearer '+getTokens()
      },
    };
    Axios.get('http://localhost:3001/dashboard/',config)
    .then((res) => {
      console.log(res);
      this.setState({
        admno: res.data.admno,
        name: res.data.name,
        programme: res.data.prog,
        sem: res.data.sem,
        dept: res.data.dept,
        schol: res.data.schol,
        deadline: res.data.deadline,
        paid: res.data.paid,
        fine: res.data.fine
      });
    });
  }
    handleLogout(){
      logouts();
      this.props.history.push('/');
    }
     pay(){
      this.props.history.push('/Confirmation');
    }
    reset(){
      this.props.history.push('/Reset');
    }
render(){
 return (
<div className="home">
 <div className="header">
  <img src={require("./cet.png")}/>
 </div>
 <div className="row">
  <div className="leftcolumn">
    <div className="card1">
    <div className={Style.details}>
      <p>Fee Details</p>
      <span id='schol'>Scholarship Details: {this.state.schol}</span>
      <span id='deadline'>Fee Deadline: {this.state.deadline}</span>
      <span id='paid'>Paid : {this.state.paid}</span>
      {this.state.paid == 'No' ?
      <div>
      <div className={Style.pay}>
      <span title="Base fine:Rs.10 It will be double after next two days and so on" className={Style.fine}>?</span>
      <span id='fine'>Fine imposed: {this.state.fine}</span></div>
      <button className={Style.paybutton} type="Submit" onClick={this.pay}> Pay </button>
      </div> : <span/>}
      </div>
    </div>
  </div>
  <div className="rightcolumn">
    <div className="card1"> 
    <div className={Style.details}>
      <p id='admno'>{this.state.admno}</p> 
      <span id='name'>{this.state.name}</span> 
      <span id='programme'>{this.state.programme}</span>
      <span id='sem'>{this.state.sem}</span>
      <span id='dept'>{this.state.dept}</span>
      </div>
    </div>
    <div className="card1">
     <button onClick={this.handleLogout}> Logout </button>
     <button onClick={this.reset}> Reset Password </button>
    </div>
  </div>
 </div>
</div>

  );
 }
}
export default Studenthome;
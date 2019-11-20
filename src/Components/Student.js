import React from 'react';
import Style from './css/Student.module.css';
import { logins, logouta, logouts, isLogins } from '../utils';
import Axios from 'axios';

class Student extends React.Component  {
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      username: '',
      password: '',
      error:''
    };
  };
  componentDidMount = () => {
    logouta();
    logouts();
  };

  handleChange = ({ target }) => {
   
    this.setState({ [target.name]: target.value });
  };

  handleLogin(e){
    e.preventDefault();
    let error;
      if(this.state.username=='' || this.state.password=='')
      { 
        error="Username or Password should not be empty"; 
      }
      else
      {
        error="Username or Password is incorrect";
    Axios.post('http://localhost:3001/users/login',{
      username: this.state.username,
      password: this.state.password,
      role: 'student'
    })
    .then(res => {
      if(res.data.success) {
        logins(res.data.token);
        this.props.history.push('/Studenthome'); 
      }
      else{
        
      }
    }); 
  }
  this.setState({ error: error }); 
}

  handleClick (){
    this.props.history.push('/Admin');
  };
 render(){
  const {error} = this.state;
    return (
      <div studentwrap>
      <div className={Style.topRight}>
      Are you an Administrator?   
      <button className={Style.button2} onClick={this.handleClick}>Login</button>
      </div>
        <div className={Style.login}>
        <div className={Style.imagecssstudent}>
        <img src={require("./cet.png")}/>
        <hr/>
        </div>
        <form className={Style.formstudent}>
        <div>{error===""? <p className={Style.normal}>Student<i class="fa fa-circle-o"></i></p>: <p title={error} className={Style.error}>Student<i class="fa fa-circle-o"></i></p>}</div>  
        <input type="text" id="username" name="username" placeholder="Admission Number" className={Style.input1} value={this.state.username} onChange={this.handleChange} required />
        <input type="password" id="password" name="password" placeholder="Password" className={Style.input1} value={this.state.password} onChange={this.handleChange} required/> 
        <button type="submit" onClick={this.handleLogin}>Login</button>
        </form>
        </div>
      </div>
    );
}}
export default Student;

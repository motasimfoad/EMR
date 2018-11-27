import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  CardHeader,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  TabContent, 
  TabPane, 
  FormText,
  Alert,
  Nav, 
  NavItem, 
  NavLink, 
 } from "reactstrap";
import Button from "components/CustomButton/CustomButton.jsx";

import { Mutation } from "react-apollo";
import ReactLoading from 'react-loading';
import { GraphQLClient } from 'graphql-request';
import classnames from 'classnames';

import gql from "graphql-tag";

const client = new GraphQLClient('https://api.graph.cool/simple/v1/cjnaaji6g014p0127lqfjvz73', {
 headers : {

 }
});

class Reg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '2',
      loginEmail : '',
      loginPass : '',
      token : '',
      regEmail : '',
      regPass : '',
      regName : '',
      regId : '',
      regPhn : '',
      regType : '',
      
};
      this.handleChange = this.handleChange.bind(this);
      this.reg = this.reg.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.id]: evt.target.value });
  }

  reg() {
    const email = this.state.regEmail
    const pass = this.state.regPass 

    return client.request(`
     mutation(
       $email : String!
       $pass : String!
     ){
      createUser(
        authProvider : {
          email : {
            email : $email
            password : $pass
          }
        }
        
      ){
        id
      }
    }
   
  `,
  {
    email ,
    pass 
  })
 }

  render() {
   return (
      
    <div className="authMain">
    <h2 className="mainAuthLogo"><span className="authPageTextLogo">CVIS</span><b> EMR</b> </h2>
    <div className ="authFormHelper">
    <div className="authForm">

      <TabContent activeTab={this.state.activeTab}>

        <TabPane tabId="1">
        
        <form className="authFormDevider">
        <FormGroup>
          <Label for="exampleEmail">Email address</Label>
          <Input
            type="email"
            id="loginEmail"
            placeholder="Enter email"
            onChange={this.handleChange}
          />
          <FormText color="muted">
            We'll never share your email with anyone else.
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            id="loginPass"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </FormGroup>
      <Button color="primary" onClick={this.login}>
          Login
        </Button>
        </form>

        </TabPane>
        
        <TabPane tabId="2">

        <form className="authFormDevider">
        <div className="form-row">
        <FormGroup className="col-md-6">
          <Label for="inputEmail4">Email</Label>
          <Input type="email"  id="regEmail" placeholder="Email" onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup className="col-md-6">
          <Label for="inputPassword4">Password</Label>
          <Input type="password"  id="regPass" placeholder="Password" onChange={this.handleChange}/>
        </FormGroup>
       </div>
        <FormGroup>
          <Label for="inputAddress">Name</Label>
          <Input type="text"  id="regName" placeholder="User Full Name" onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="inputAddress2">Identification Number</Label>
          <Input type="text"  id="regId" placeholder="Nid / Passport / Birth Cirtificate/ Doctor, Pharma or Hospitals licence no" onChange={this.handleChange}/>
        </FormGroup>
      <div className="form-row">
        <FormGroup className="col-md-6">
          <Label for="inputCity">Phone</Label>
          <Input type="text"  id="regPhn" onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup className="col-md-6">
          <Label for="inputState">User Type</Label>
          <Input type="select" name="select" id="regType" onChange={this.handleChange}>
            <option>Patient</option>
            <option>Doctor</option>
            <option>Pharmacy</option>
            <option>Hospital</option>
          </Input>
        </FormGroup>
       
      </div>
      
     
    </form>
    <Button type="submit" color="primary" onClick={this.reg}>Register</Button>
        </TabPane>
      </TabContent>
    </div>
    
    </div>
    </div>
   
   
  );
  }
}

export default Reg;

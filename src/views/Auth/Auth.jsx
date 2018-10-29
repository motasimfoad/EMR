import React from "react";
import { 
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 

} from "reactstrap";
import classnames from 'classnames';
class Auth extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      activeTab: '1'
    };

    this.toggle = this.toggle.bind(this);
    
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="authMain">
      <div className ="authFormHelper">
      <div className="authForm">

      <div className="authFormImgHelper">
      <img className="authFormImg" src ="https://png2.kisspng.com/20180329/cre/kisspng-logo-swarm-computer-icons-pharma-5abd434994b948.7788752515223529696092.png" alt ="Missing"/>
      </div>
      
      <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Register
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          <form className="authFormDevider">
          <FormGroup>
        <Label for="exampleEmail">Email address</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="Enter email"
        />
        <FormText color="muted">
          We'll never share your email with anyone else.
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder="Password"
        />
      </FormGroup>
     <Button color="primary" type="submit">
        Login
      </Button>
          </form>
          </TabPane>
          
          <TabPane tabId="2">
          <form className="authFormDevider">
          <div className="form-row">
          <FormGroup className="col-md-6">
            <Label for="inputEmail4">Email</Label>
            <Input type="email"  id="inputEmail4" placeholder="Email"/>
          </FormGroup>
          <FormGroup className="col-md-6">
            <Label for="inputPassword4">Password</Label>
            <Input type="password"  id="inputPassword4" placeholder="Password"/>
          </FormGroup>
         </div>
          <FormGroup>
            <Label for="inputAddress">Name</Label>
            <Input type="text"  id="inputAddress" placeholder="User Full Name"/>
          </FormGroup>
          <FormGroup>
            <Label for="inputAddress2">Identification Number</Label>
            <Input type="text"  id="inputAddress2" placeholder="Nid / Passport / Birth Cirtificate/ Doctor, Pharma or Hospitals licence no"/>
          </FormGroup>
        <div className="form-row">
          <FormGroup className="col-md-6">
            <Label for="inputCity">Phone</Label>
            <Input type="text"  id="inputCity"/>
          </FormGroup>
          <FormGroup className="col-md-6">
            <Label for="inputState">User Type</Label>
            <Input type="select" name="select" id="inputState" >
              <option>Patient</option>
              <option>Doctor</option>
              <option>Pharmacy</option>
              <option>Hospital</option>
            </Input>
          </FormGroup>
         
        </div>
        
        <Button type="submit" color="primary">Register</Button>
      </form>
          </TabPane>
        </TabContent>
      </div>
      
      </div>
      </div>
     
     
    );
  }
}

export default Auth;

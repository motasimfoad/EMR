import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
  Navbar,
  Form, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Input,
  Table,
  Alert
 } from "reactstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import gql from "graphql-tag";
import {client} from "../../index";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withApollo } from 'react-apollo';
import Footer from "../../components/Footer/Footer";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";


class AdminSearchUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '', 
      inputText: '', 
      mode:'view',
      result : []
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.display = this.display.bind(this);
    this.toggle = this.toggle.bind(this);
    this.logOut = this.logOut.bind(this);
    this.up = this.up.bind(this);
    this.back = this.back.bind(this);
    this.delete = this.delete.bind(this);
    this.preDelete = this.preDelete.bind(this);

  //   if (typeof(props.history.location.state) == 'undefined' || props.history.location.state == null) {
  //     this.props.history.push({
  //       pathname: '/unauth',
  //     });
  //   }
  //   else {
  //     this.state = {
  //       drid : this.props.history.location.state.logInfo[1],
  //     logInfoToken : this.props.history.location.state.logInfo[0],
  //     docname : this.props.history.location.state.logInfo[2],
  //     text: '', 
  //   inputText: '', 
  //   mode:'view',
  //   result : []
  //   }
  //     console.log(this.state.docname);
  // }
  }
  

  toggle(viewPresciptionId) {
    this.setState({
      modal: !this.state.modal,
      viewPresciptionId
    });
  }

  preDelete(viewPresciptionId) {
    confirmAlert({
      title: 'Delete?',
      
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.delete(viewPresciptionId)
        },
        {
          label: 'No',
          onClick: () => alert('Delete action cancelled')
        }
      ]
    })
  }
  

  async delete(viewPresciptionId){
    alert("Successfully Deleted")
    const obj = await client.mutate({
      mutation: gql`
          mutation deleteUser($id: ID!) {
            deleteUser(id: $id) {
              phone
              id
            }
          }
      `,
      
      variables: {
          id : viewPresciptionId
      },
      refetchQueries: [{
        query : gql`
      {
        allUsers{
          name
          id
          phone
          nid
          utype
          createdAt
          updatedAt
          email
        }
    }
    `}] 
  });
}

up(id, createdAt, updatedAt, phone, nid , name, utype, email) {
  // this.setState({
  //   data
  // });
  this.props.history.push({
    pathname: '/uua',
    state: { some: [id, createdAt, updatedAt, phone, nid , name, utype, email] }
  })
}

  handleChange(e) {
    this.setState({ inputText: e.target.value });
  }
  
  handleSave() {
    this.setState({text: this.state.inputText, mode: 'view'});
  }

  handleEdit() {
    this.setState({mode: 'edit'});
  }

  back() {
    this.props.history.push({
      pathname: '/docdash',
      state: { logInfo: [this.state.drid, 
        this.state.logInfoToken,
        this.state.docname
      ] }
    });
  }

  logOut(){
    this.props.history.push({
      pathname: '/auth',
    });
  }

  display(){
    client.query({
      variables: { searchText: this.state.inputText },
      query: gql`
        query allUsers($searchText: String!){
      
          allUsers
          (
            filter :{
            OR: [
              {
                nid : $searchText
              },
              {
                phone : $searchText
              },
              {
                email : $searchText
              }
            ]
          }
          )
          {
            name
            id
            phone
            nid
            utype
            createdAt
            updatedAt
            email
          }

        }
      `,
      
    })
    .then(result => { 
      
      this.setState({
        result: result
      });

     this.handleEdit();
      console.log(this.state.result.data.allUsers);
      
      
     })
    .catch(error => { console.log(error) });
  }
  
  render () {
    if(this.state.mode === 'view') {
      return (

        <div className="content">
        <div >
         <Alert className="searchbar" color="danger">
         <br/>
         <h2>
         <i className="fa fa-search "/> 
         &nbsp;&nbsp;Search for User <br/>
         </h2>
         <form>
        <Input className="searchboxheight" type="text" placeholder="Search using nid/phone/any kind of id/ email" id="inputText" onChange={this.handleChange} required/>
        <br />
        
        </form>
        <Button size="lg" color="primary" onClick={this.display}>
          <i className="nc-icon nc-zoom-split" />  Search
        </Button> <br />
       
        </Alert>
      
       </div>
       <Footer />
       </div>

        
      );
    } else {
      return (

        <div className="content">
      <Navbar expand="lg" color="dark">
      <Form inline className="ml-auto">
       <FormGroup >
        <Input type="text" placeholder="Search" id="searchText" onChange={this.handleChange}/>
      </FormGroup>
      <Button  color="neutral" icon round onClick={this.display}>
       <i className="nc-icon nc-zoom-split"></i>
     </Button>
      </Form>
      </Navbar>
      <div>
      <Row className="helper">

      {this.state.result.data.allUsers.length === 0 &&
        <div className="searchCenter">
          <Alert color="danger">
          <h3>
          No User found corresponding to given id/nid/phone/passport/birthcirtificate/email.
        </h3>
          </Alert>
         <h4>
           <Alert color="info">
           You have inserted
           <Alert color="light">
           
        <pre>
          {this.state.inputText}
        </pre>
        </Alert>
           </Alert>
       
        </h4>
        
       </div>
        
      }
     
     {  
        
         this.state.result.data.allUsers.map(({ id, createdAt, updatedAt, phone, nid , name, utype, email }) => (
          
          <Col key={id+1} xs="auto">
          
          <Card style={{width: '20rem'}}>
          <CardImg top src="https://openclipart.org/download/247319/abstract-user-flat-3.svg" alt="..."/>
          <CardBody>
            <CardTitle>Name : {name}</CardTitle>
            <CardText><b>User Type :</b> {utype}</CardText>
            <CardText><b>Created At :</b> {createdAt}</CardText>
            <Button key={id+2} onClick={() => {this.toggle(id)}} color="primary">View</Button>
            <Button color="default" onClick={() => {this.up(id, createdAt, updatedAt, phone, nid , name, utype, email)}}>Update</Button> 
            <Button color="danger" onClick={() => {this.preDelete(id)}}>Delete</Button>
            
            <Modal key={id+3} isOpen={this.state.modal && this.state.viewPresciptionId === id} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}><p>Details of : <b><i>{name}</i></b></p></ModalHeader>
            <ModalBody>
            <Table key={id+4} bordered>
  
              <tbody>
              <tr>
              <td>
               Id : &nbsp; {id}
              </td>
              </tr>
              <tr>
              <td>
              Created at :  &nbsp; {createdAt}
              </td>
              </tr>
              <tr>
              <td>
              Name :  &nbsp; {name}
              </td>
              </tr>
              <tr>
              <td>
              Phone :  &nbsp; {phone}
               </td>
              </tr>
              <tr>
              <td>
              Nid :  &nbsp; {nid}
              </td>
              </tr>
              <tr>
              <td>
              Email :  &nbsp; {email}
              </td>
              </tr>
              <tr>
              <td>
              User Type :  &nbsp; {utype}
              </td>
              </tr>
             
              <tr>
              <td>
              Last Updated :  &nbsp; {updatedAt}
              </td>
              </tr>
              </tbody>
            </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Back</Button>
            </ModalFooter>
            </Modal>

          </CardBody>
          </Card>
          </Col>    
      ))
      }

      </Row>
      </div>
    
      </div>

      );
    }
  }
}


export default withApollo(AdminSearchUser);

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
  Table
 } from "reactstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ReactLoading from 'react-loading';
import {client} from "../../index";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";
import { withApollo } from 'react-apollo'


class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewPresciptionId: null,
      searchText : '',
      
      inputModal : false,
    };
    this.toggle = this.toggle.bind(this);
    this.up = this.up.bind(this);
    this.delete = this.delete.bind(this);
    this.preDelete = this.preDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.display = this.display.bind(this);
    this.inputmodal = this.inputmodal.bind(this);

    
    
  }
  
  inputmodal() {
    // this.setState({
    //   inputModal: !this.state.inputModal
    // });
  }

  display(){
    client.query({
      variables: { searchText: this.state.searchText },
      query: gql`
        query allPrescriptions($searchText: String!){
      
          allPrescriptions(
            filter : {
            OR : [{
                nid : $searchText
              },{
                phn : $searchText
              }
              ]
          }
          ){
            id
            docname
            docid
            details
            createdAt
            owner
            chember
            med
            updatedAt
            phn
            nid
          }
        }
      `,
      
    })
    .then(result => { 

      this.state = {
        result : []
      }
      
      this.setState({
        result: result
      });
      // console.log(this.state.result.data.allPrescriptions);
      
      
     })
    .catch(error => { console.log(error) });
  }

  handleChange(evt) {
    this.setState({ [evt.target.id]: evt.target.value });
  }

  toggle(viewPresciptionId) {
    this.setState({
      modal: !this.state.modal,
      viewPresciptionId
    });
  }

  up(id , docname, details, createdAt, owner, docid, chember, med, updatedAt, phn , nid) {
    // this.setState({
    //   data
    // });
    this.props.history.push({
      pathname: '/up',
      state: { some: [id , docname, details, createdAt, owner, docid, chember, med, updatedAt, phn, nid] }
    })
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
          mutation deletePrescription($id: ID!) {
            deletePrescription(id: $id) {
              owner
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
      allPrescriptions{
        id
        docname
        docid
        details
        createdAt
        owner
        chember
        med
        updatedAt
        phn
      }
    }
    `}] 
  });
}

  render() {
    if (typeof(this.state.result) !== 'undefined' || this.state.result !== null) {
      alert("asda")
    } 
    console.log(this.state.result);
    
    return (
      <div className="content">
      <Navbar expand="lg" color="dark">
      <Form inline className="ml-auto">
       <FormGroup className={"no-border"}>
        <Input type="text" placeholder="Search" id="searchText" onChange={this.handleChange}/>
      </FormGroup>
      <Button  color="neutral" icon round onClick={this.display}>
       <i className="nc-icon nc-zoom-split"></i>
     </Button>
      </Form>
      </Navbar>
      <div>
      <Row className="helper">
     
     
      <Modal isOpen={this.state.inputModal} toggle={this.inputModal} className={this.props.className}>
          <ModalHeader toggle={this.inputModal}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.inputmodal}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.inputmodal}>Cancel</Button>
          </ModalFooter>
        </Modal>

      {  
        
        this.state.result.length < 0 &&

         this.state.result.data.allPrescriptions.map(({ id, docname, details, createdAt, owner, docid, chember, med, updatedAt, phn, nid }) => (
          
          <Col key={id+1} xs="auto">
          
          <Card style={{width: '20rem'}}>
          <CardImg top src="http://icons-for-free.com/free-icons/png/512/1290990.png" alt="..."/>
          <CardBody>
            <CardTitle>Doctor : {docname}</CardTitle>
            <CardText><b>Problem :</b> {details}</CardText>
            <CardText><b>Date :</b> {createdAt}</CardText>
            <Button key={id+2} onClick={() => {this.toggle(id)}} color="primary">View</Button>
            <Button color="default" onClick={() => {this.up(id , docname, details, createdAt, owner, docid, chember, med, updatedAt, phn, nid)}}>Update</Button>
            <Button color="danger" onClick={() => {this.preDelete(id)}}>Delete</Button>
            
            <Modal key={id+3} isOpen={this.state.modal && this.state.viewPresciptionId === id} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}><p>Prescription of <b><i>{owner}</i></b></p></ModalHeader>
            <ModalBody>
            <Table key={id+4} bordered>
  
              <tbody>
              <tr>
              <td>
              Prescription Id : &nbsp; {id}
              </td>
              </tr>
              <tr>
              <td>
              Created at :  &nbsp; {createdAt}
              </td>
              </tr>
              <tr>
              <td>
              Doctor :  &nbsp; {docname}
              </td>
              </tr>
              <tr>
              <td>
              DocID :  &nbsp; {docid}
               </td>
              </tr>
              <tr>
              <td>
              Paitent contact no :  &nbsp; {phn}
              </td>
              </tr>
              <tr>
              <td>
              Chember :  &nbsp; {chember}
              </td>
              </tr>
              <tr>
              <td>
              Details :  &nbsp; {details}
              </td>
              </tr>
              <tr>
              <td>
              Medicine :  &nbsp; {med}
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

export default withApollo(Search);

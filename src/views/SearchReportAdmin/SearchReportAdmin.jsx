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
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";




class SearchReportAdmin extends React.Component {

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
    this.delete = this.delete.bind(this);
    this.preDelete = this.preDelete.bind(this);
   }

  toggle(viewPresciptionId) {
    this.setState({
      modal: !this.state.modal,
      viewPresciptionId
    });
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
          mutation deleteReport($id: ID!) {
            deleteReport(id: $id) {
              
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
        allReports{
          id
          imageid
          imageUrl
          phoneid
          createdAt
          updatedAt
      }
    }
    `}] 
  });
}

 
  display(){
    client.query({
      variables: { searchText: this.state.inputText },
      query: gql`
        query allReports($searchText: String!){
      
          allReports(
            filter : {
              phoneid : $searchText
            }
          ){
            id
            imageid
            imageUrl
            phoneid
            createdAt
            updatedAt
          }
          
        }
      `,
      
    })
    .then(result => { 
      
      this.setState({
        result: result
      });

     this.handleEdit();
      console.log(this.state.result.data.allReports);
      
      
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
         &nbsp;&nbsp;Search for Report <br/>
         </h2>
         <form>
        <Input className="searchboxheight" type="text" placeholder="Search using nid/phone/any kind of id" id="inputText" onChange={this.handleChange} required/>
        <br />
        <Button size="lg" color="primary" onClick={this.display}>
          <i className="nc-icon nc-zoom-split" />  Search
        </Button> <br />
        </form>
        </Alert>
      
       </div>
       
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
      <Row>

      {this.state.result.data.allReports.length === 0 &&
        <div className="searchCenter">
          <Alert color="danger">
          <h3>
          No report found corresponding to given id/nid/phone/passport/birthcirtificate.
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
        
         this.state.result.data.allReports.map(({ id, imageid, imageUrl, phoneid, updatedAt, createdAt}) => (
          
          <Col key={id+1} xs="auto">
          
          <Card style={{width: '20rem'}}>
          <CardImg top src={imageUrl} alt="..."/>
          <CardBody>
            
            <CardText><b>Report added using (id/phone):</b> {phoneid}</CardText> 
            <CardText><b>Prescription Added :</b> {createdAt}</CardText>
            <Button key={id+2} onClick={() => {this.toggle(id)}} color="primary">View</Button>
            <a key={id+4} href={imageUrl} target="_blank"><Button  color="primary">Download</Button></a>
            <Button color="danger" onClick={() => {this.preDelete(id)}}>Delete</Button>
            <Modal key={id+3} isOpen={this.state.modal && this.state.viewPresciptionId === id} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}><p>Report Registered using ID/Phone : <b><i>{phoneid}</i></b></p></ModalHeader>
            <ModalBody>
            <Table key={id+4} bordered>
  
              <tbody>
              <tr>
              <td>
              <img src={imageUrl} />
              </td>
              </tr>
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
              Paitent contact no :  &nbsp; {phoneid}
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


export default withApollo(SearchReportAdmin);

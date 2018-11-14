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


class Docsearch extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   text: '', 
    //   inputText: '', 
    //   mode:'view',
    //   result : []
    // };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.display = this.display.bind(this);
    this.toggle = this.toggle.bind(this);
    this.logOut = this.logOut.bind(this);
    this.up = this.up.bind(this);
    this.back = this.back.bind(this);

    if (typeof(props.history.location.state) == 'undefined' || props.history.location.state == null) {
      this.props.history.push({
        pathname: '/unauth',
      });
    }
    else {
      this.state = {
        drid : this.props.history.location.state.logInfo[1],
      logInfoToken : this.props.history.location.state.logInfo[0],
      docname : this.props.history.location.state.logInfo[2],
      text: '', 
    inputText: '', 
    mode:'view',
    result : []
    }
      console.log(this.state.docname);
  }
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
      pathname: '/doc_prescription_update',
      state: { some: [id , docname, details, createdAt, owner, docid, chember, med, updatedAt, phn, nid] , 
        logInfo: [this.state.drid, 
          this.state.logInfoToken,
          this.state.docname
        ]         
      }
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
      
      this.setState({
        result: result
      });

     this.handleEdit();
      console.log(this.state.result.data.allPrescriptions);
      
      
     })
    .catch(error => { console.log(error) });
  }
  
  render () {
    if(this.state.mode === 'view') {
      return (

        <div>
        <div >
         <Alert className="searchbar" color="danger">
         <br/>
         <h2>
         <i className="fa fa-search "/> 
         &nbsp;&nbsp;Search for prescription <br/>
         </h2>
         <form>
        <Input className="searchboxheight" type="text" placeholder="Search using nid/phone/any kind of id" id="inputText" onChange={this.handleChange} required/>
        <br />
        <Button size="lg" color="primary" onClick={this.display}>
          <i className="nc-icon nc-zoom-split" />  Search
        </Button> <br />
        </form>
        <Button type="submit" value="Submit" color="info" size="lg" onClick={this.back}><i className="fa fa-angle-double-left "/> &nbsp;Back</Button>
        <Button color="warning" size="lg" onClick={this.logOut}>LogOut</Button>
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

      {this.state.result.data.allPrescriptions.length === 0 &&
        <div className="searchCenter">
          <Alert color="danger">
          <h3>
          No prescription found corresponding to given id/nid/phone/passport/birthcirtificate.
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
        
         this.state.result.data.allPrescriptions.map(({ id, docname, details, createdAt, owner, docid, chember, med, updatedAt, phn, nid }) => (
          
          <Col key={id+1} xs="auto">
          
          <Card style={{width: '20rem'}}>
          <CardImg top src="http://icons-for-free.com/free-icons/png/512/1290990.png" alt="..."/>
          <CardBody>
            <CardTitle>Doctor : {docname}</CardTitle>
            <CardText><b>Problem :</b> {details}</CardText>
            <CardText><b>Date :</b> {createdAt}</CardText>
            <Button key={id+2} onClick={() => {this.toggle(id)}} color="primary">View</Button>
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
            <Button color="default" onClick={() => {this.up(id , docname, details, createdAt, owner, docid, chember, med, updatedAt, phn, nid)}}>Update</Button>
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
      <Button className="searchBtHelper" type="submit" value="Submit" color="info" onClick={this.back}><i className="fa fa-angle-double-left "/> &nbsp;Back</Button>
      <Button className="searchBtHelper" color="warning" onClick={this.logOut}>LogOut</Button>
      <Footer />
      </div>

      );
    }
  }
}


export default withApollo(Docsearch);

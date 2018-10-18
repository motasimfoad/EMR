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
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Table,
  FormGroup,
  Label,
  Input
 } from "reactstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import ReactLoading from 'react-loading';

// const CreatePrescription = () => (
//   <Mutation
//     mutation={gql`
//       mutation createPrescription{
//           createPrescription(
//             docid: "14101054"
//             details: "Bismillah"
//             docname: "Likajhf"
//             owner: "niggahh"
//           ){
//             id
//           }
//         }
//       `}
//   >
//     {(CreatePrescription, {data, loading, error}) => {
//       if (loading) return <p > Loading...</p>;
//       console.log(loading);
//       if (data) return  {data.createPrescription.id} 
//       if (error) return <p>Error :(</p>;
//       return <p onClick={()=>{CreatePrescription()}} >Success :)</p>;
//       }}
//   </Mutation>
// );



class Prescription_Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      modal: false,
      nestedModal: false,
      closeAll: false,

      pname: '',
      nid: '',
      docname: '',
      drid: '',
      inputAddress: '',
      phnno: '',
      inputDetails: '',
      inputMed: ''

    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.id]: evt.target.value });
  }

  handleSubmit() {
    this.toggle();
    
   
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  
  render() {

    return (
      <div className="content">

      <Mutation
      mutation={gql`
      mutation createPrescription(
        $owner: String!,
        $nid: String,
        $docname: String!,
        $docid: String!,
        $chember: String,
        $details: String!,
        $med: String,
        $phn: String
       ){
          createPrescription(
            owner: $owner,
            nid  : $nid ,
        docname  : $docname,
         docid   : $docid,
        chember  : $chember,
        details  : $details,
           med   : $med,
          phn    : $phn
          ){
            id
            owner
            docname
            details
            phn
          }
        }
      `}
      variables = {{
        owner: this.state.pname,
        nid: this.state.nid,
        docname: this.state.docname,
        docid: this.state.drid,
        chember: this.state.inputAddress,
        details: this.state.inputDetails,
        med: this.state.inputMed,
        phn: this.state.phnno,
      }}
  >
    {(CreatePrescription, {data, loading, error}) => {
      if (loading) return <div>
      <ReactLoading className="loadingScreenAnimation" type={'spin'} color={'white'} height={'60%'} width={'60%'} />
      </div>;
      if (data) return  <div className="successCreateNoify">
        <Card className="successCreateNoifyHelper" style={{width: '30rem'}}>
          <CardImg top src="https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png" alt="Card image cap" />
          <CardTitle>Prescription Created Successfully!!</CardTitle>
          <CardText>
          Prescription ID : <b>{data.createPrescription.id}</b>< br />
          Patient Name : <b>{data.createPrescription.owner}</b>< br />
          Doctor Name : <b>{data.createPrescription.docname}</b>< br />
          Health Issues : <b>{data.createPrescription.details}</b>< br />
          Paitent Contact No : <b>{data.createPrescription.phn}</b>< br />
          </CardText>
          <Button href="/cp">Back</Button>
        </Card>
       </div> ;
      if (error) return <p>Error :(</p>;
      return  <Row>
      <Col md={12}>
        <Card>
          <CardHeader>
            <h5 className="title">Fill Up The Form With Patient Information</h5>
            
          </CardHeader>
          <CardBody>
          <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <FormGroup className="col-md-6">
              <Label for="pname">Patient Name</Label>
              <Input type="text"  id="pname" placeholder="Patient Name" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label for="nid">NID / Passpost No / Birth Cirtificate No</Label>
              <Input type="text"  id="nid" placeholder="NID / Passpost No / Birth Cirtificate No" onChange={this.handleChange}/>
            </FormGroup>
          </div>
          <div className="form-row">
            <FormGroup className="col-md-6">
              <Label for="docname">Doctors Name</Label>
              <Input type="text"  id="docname" placeholder="Doctors Name" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label for="drid">Doctors ID</Label>
              <Input type="text"  id="drid" placeholder="Doctors ID" onChange={this.handleChange}/>
            </FormGroup>
          </div>
          <div className="form-row">
            <FormGroup className="col-md-6">
            <Label for="inputAddress">Chember Address</Label>
            <Input type="text"  id="inputAddress" placeholder="Doctors Chember Address" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label for="phnno">Patient contact no</Label>
              <Input type="text"  id="phnno" placeholder="Patient contact no" onChange={this.handleChange}/>
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="inputDetails">Details</Label>
            <Input type="text"  id="inputDetails" placeholder="Issues regarding the patient" onChange={this.handleChange}/>
          </FormGroup>
          <div className="form-row">
            <FormGroup className="col-md-12">
              <Label for="inputMed">Medicin</Label>
              <Input type="text"  id="inputMed" placeholder="Suggested medicins for the patient" onChange={this.handleChange}/>
            </FormGroup>
          
          </div>
          
          <Button type="submit" value="Submit" color="success" size="lg" onClick={()=>{CreatePrescription()}}><i className="fa fa-save"/> &nbsp;Create</Button>
        </form>
                </CardBody>
              </Card>
            </Col>
          </Row>;
            }}
        </Mutation>

     <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default Prescription_Create;

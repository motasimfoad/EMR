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


const CreatePrescription = () => (
  <Mutation
    mutation={gql`
      mutation createPrescription{
          createPrescription(
            docid: "14101054"
            details: "Bismillah"
            docname: "Likajhf"
            owner: "niggahh"
          ){
            id
          }
        }
      `}
  >
    {(data, loading, error) => {
      if (loading) return <p onClick={()=>{CreatePrescription()}}> Loading...</p>;
      console.log(loading);
      if (data) return <pre> {data.createPrescription.id} </pre>
      if (error) return <p>Error :(</p>;
      return <p onClick={()=>{CreatePrescription()}} >Success :)</p>;
      }}
  </Mutation>
);

// function cp(tabKey) {
//   apolloClient.mutate({
//     variables: { text: "hello" },
//     mutation: gql`
//       mutation AddComment($text: String!){
//         addComment(text: $text) {
//           id
//           text
//         }
//       }
//     `,
    
//   })
//   .then(result => { console.log(result) })
//   .catch(error => { console.log(error) });
// }


class Prescription_Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
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
       <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <h5 className="title">Fill Up The Form With Patient Information</h5>
                
              </CardHeader>
              <CardBody>
              <form>
              <div className="form-row">
          <FormGroup className="col-md-6">
            <Label for="pname">Patient Name</Label>
            <Input type="text"  id="pname" placeholder="Patient Name"/>
          </FormGroup>
          <FormGroup className="col-md-6">
            <Label for="nid">NID / Passpost No / Birth Cirtificate No</Label>
            <Input type="text"  id="nid" placeholder="NID / Passpost No / Birth Cirtificate No"/>
          </FormGroup>
        </div>
        <div className="form-row">
          <FormGroup className="col-md-6">
            <Label for="inputEmail4">Doctors Name</Label>
            <Input type="email"  id="inputEmail4" placeholder="Doctors Name"/>
          </FormGroup>
          <FormGroup className="col-md-6">
            <Label for="phnno">Doctors ID</Label>
            <Input type="text"  id="phnno" placeholder="Doctors ID"/>
          </FormGroup>
        </div>
        <FormGroup>
          <Label for="inputAddress">Chember Address</Label>
          <Input type="text"  id="inputAddress" placeholder="Doctors Chember Address"/>
        </FormGroup>
        <FormGroup>
          <Label for="inputDetails">Details</Label>
          <Input type="text"  id="inputDetails" placeholder="Issues regarding the patient"/>
        </FormGroup>
        <div className="form-row">
          <FormGroup className="col-md-12">
            <Label for="inputMed">Medicin</Label>
            <Input type="text"  id="inputMed" placeholder="Suggested medicins for the patient"/>
          </FormGroup>
         
        </div>
        
        <Button type="submit" color="success" size="lg"><i className="fa fa-save"/> &nbsp;Create</Button>
      </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        < CreatePrescription />
      </div>
    );
  }
}

export default Prescription_Create;

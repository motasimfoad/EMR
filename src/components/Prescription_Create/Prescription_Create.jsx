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
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ReactLoading from 'react-loading';

const ListUser = (props) => (
  <Query
    query={gql`
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
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>
      <ReactLoading className="loadingScreenAnimation" type={'spin'} color={'white'} height={'60%'} width={'60%'} />
      </div>;
      if (error) return <p>Error :(</p>;

      return data.allPrescriptions.map(({ id, docname, details, createdAt, owner, docid, chember, med, updatedAt }) => (
          
          <Col key={id} xs="auto">
          <Card style={{width: '20rem'}}>
          <CardImg top src="http://icons-for-free.com/free-icons/png/512/1290990.png" alt="..."/>
          <CardBody>
            <CardTitle>Doctor : {docname}</CardTitle>
            <CardText><b>Problem :</b> {details}</CardText>
            <CardText><b>Date :</b> {createdAt}</CardText>
            <Button key={id} onClick={props.toggle} color="primary">View</Button>
            <Button color="default">Update</Button>
            <Button color="danger">Delete</Button>
            <Modal key={id} isOpen={props.state.modal} toggle={props.toggle} >
            <ModalHeader toggle={props.toggle}><p>Prescription of <b><i>{docname}</i></b></p></ModalHeader>
            <ModalBody>
            <Table key={id} bordered>
  
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
              <Button color="secondary" onClick={props.toggle}>Back</Button>
            </ModalFooter>
            </Modal>

          </CardBody>
          </Card>
          </Col>
      ));
    }}
  </Query>
  );

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
      </div>
    );
  }
}

export default Prescription_Create;

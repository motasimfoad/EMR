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
        phn
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>
      <ReactLoading className="loadingScreenAnimation" type={'spin'} color={'white'} height={'60%'} width={'60%'} />
      </div>;
      if (error) return <p>Error :(</p>;

      return data.allPrescriptions.map(({ id, docname, details, createdAt, owner, docid, chember, med, updatedAt, phn }) => (
          
          <Col key={id+1} xs="auto">
          <Card style={{width: '20rem'}}>
          <CardImg top src="http://icons-for-free.com/free-icons/png/512/1290990.png" alt="..."/>
          <CardBody>
            <CardTitle>Doctor : {docname}</CardTitle>
            <CardText><b>Problem :</b> {details}</CardText>
            <CardText><b>Date :</b> {createdAt}</CardText>
            <Button key={id+2} onClick={() => {props.toggle(id)}} color="primary">View</Button>
            <Button color="default">Update</Button>
            <Button color="danger">Delete</Button>
            <Modal key={id+3} isOpen={props.state.modal && props.state.viewPresciptionId === id} toggle={props.toggle} >
            <ModalHeader toggle={props.toggle}><p>Prescription of <b><i>{owner}</i></b></p></ModalHeader>
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

class Prescription extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewPresciptionId: null,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(viewPresciptionId) {
    this.setState({
      modal: !this.state.modal,
      viewPresciptionId
    });
  }

  render() {
    return (
      <div className="content">
      <Navbar expand="lg" color="dark">
      <Form inline className="ml-auto">
       <FormGroup className={"no-border"}>
        <Input type="text" placeholder="Search"/>
      </FormGroup>
      <Button color="neutral" icon round>
       <i className="nc-icon nc-zoom-split"></i>
     </Button>
      </Form>
      </Navbar>
      <div>
      <Row className="helper">

      <ListUser toggle={this.toggle} state={this.state}/>

      </Row>
      </div>
      </div>
    );
  }
}

export default Prescription;

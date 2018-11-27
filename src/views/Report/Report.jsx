import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  Row,
  Col,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Table
 } from "reactstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ReactLoading from 'react-loading';
import {client} from "../../index";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";

const ListUser = (props) => (
  <Query
    query={gql`
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
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>
      <ReactLoading className="loadingScreenAnimation" type={'spin'} color={'white'} height={'60%'} width={'60%'} />
      </div>;
      if (error) return <p>Error :(</p>;

      return data.allReports.map(({ id, imageid, imageUrl, phoneid, updatedAt, createdAt}) => (
          
        <Col key={id+1} xs="auto">
          
        <Card style={{width: '20rem'}}>
        <CardImg top src={imageUrl} alt="..."/>
        <CardBody>
          
          <CardText><b>Report added using (id/phone):</b> {phoneid}</CardText> 
          <CardText><b>Prescription Added :</b> {createdAt}</CardText>
          <Button key={id+2} onClick={() => {props.toggle(id)}} color="primary">View</Button>
          <a key={id+4} href={imageUrl} target="_blank"><Button  color="primary">Download</Button></a>
          <Button color="danger" onClick={() => {props.preDelete(id)}}>Delete</Button>
          <Modal key={id+3} isOpen={props.state.modal && props.state.viewPresciptionId === id} toggle={props.toggle} >
          <ModalHeader toggle={props.toggle}><p>Report Registered using ID/Phone : <b><i>{phoneid}</i></b></p></ModalHeader>
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

class Report extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewPresciptionId: null,
    };
    this.toggle = this.toggle.bind(this);
    this.up = this.up.bind(this);
    this.delete = this.delete.bind(this);
    this.preDelete = this.preDelete.bind(this);
  }

  toggle(viewPresciptionId) {
    this.setState({
      modal: !this.state.modal,
      viewPresciptionId
    });
  }

  up(id , docname, details, createdAt, owner, docid, chember, med, updatedAt, phn , nid) {
   
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
    await client.mutate({
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


  render() {
    return (
      <div className="content">
     
      <div>
      <Row className="helper">

      <ListUser toggle={this.toggle} state={this.state} delete={this.delete} preDelete={this.preDelete} up={this.up}/>

      </Row>
      </div>
      </div>
    );
  }
}

export default Report;



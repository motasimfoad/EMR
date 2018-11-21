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

const ListUser = (props) => (
  <Query
    query={gql`
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
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>
      <ReactLoading className="loadingScreenAnimation" type={'spin'} color={'white'} height={'60%'} width={'60%'} />
      </div>;
      if (error) return <p>Error :(</p>;

        return data.allUsers.map(({ id, createdAt, updatedAt, phone, nid , name, utype, email}) => (
          
          <Col key={id+1} xs="auto">
          
          <Card style={{width: '20rem'}}>
          <CardImg top src="https://openclipart.org/download/247319/abstract-user-flat-3.svg" alt="..."/>
          <CardBody>
            <CardTitle>Name : {name}</CardTitle>
            <CardText><b>User Type :</b> {utype}</CardText>
            <CardText><b>Created At :</b> {createdAt}</CardText>
            <Button key={id+2} onClick={() => {props.toggle(id)}} color="primary">View</Button>
            {/* <Button color="default" onClick={() => {props.up(id , docname, details, createdAt, owner, docid, chember, med, updatedAt, phn, nid)}}>Update</Button> */}
            <Button color="danger" onClick={() => {props.preDelete(id)}}>Delete</Button>
            
            <Modal key={id+3} isOpen={props.state.modal && props.state.viewPresciptionId === id} toggle={props.toggle} >
            <ModalHeader toggle={props.toggle}><p>Details of : <b><i>{name}</i></b></p></ModalHeader>
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

class UserPage extends React.Component {

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

      <ListUser toggle={this.toggle} state={this.state} delete={this.delete} preDelete={this.preDelete} up={this.up}/>

      </Row>
      </div>
      </div>
    );
  }
}

export default UserPage;

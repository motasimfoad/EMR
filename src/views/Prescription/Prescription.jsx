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
  ModalFooter
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
        details
        createdAt
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>
      <ReactLoading className="loadingScreenAnimation" type={'spin'} color={'red'} height={'60%'} width={'60%'} />
      </div>;
      if (error) return <p>Error :(</p>;

      return data.allPrescriptions.map(({ id, docname, details, createdAt }) => (
        
          <Col key={id} xs="auto">
          <Card style={{width: '20rem'}}>
          <CardImg top src="http://icons-for-free.com/free-icons/png/512/1290990.png" alt="..."/>
          <CardBody>
            <CardTitle>Doctor : {docname}</CardTitle>
            <CardText><b>Problem :</b> {details}</CardText>
            <CardText><b>Date :</b> {createdAt}</CardText>
            <Button onClick={props.toggle} color="primary">View</Button>
            <Button color="default">Update</Button>
            <Button color="danger">Delete</Button>
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
      <Navbar expand="lg" color="dark">
      <Form inline className="ml-auto">
      <Button onClick={this.toggle} color="primary" round outline>
      <i className="fa fa-plus"></i> Create
      </Button>
      </Form>
      </Navbar>
      <div>
      <Row className="helper">
      <ListUser toggle={this.toggle}/>
      </Row>
      </div>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create Prescription</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <br />
            <Button color="success" onClick={this.toggleNested}>Show Nested Modal</Button>
            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>Nested Modal title</ModalHeader>
              <ModalBody>Stuff and things</ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleAll}>Done</Button>{' '}
                <Button color="secondary" onClick={this.toggleAll}>All Done</Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleNested}>Create</Button>{' '}
            <Button color="danger" onClick={this.toggleNested}>Discard</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default Prescription;

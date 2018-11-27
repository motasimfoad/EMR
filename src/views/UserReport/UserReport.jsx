import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  Row,
  Col,
  Navbar,
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
import "react-confirm-alert/src/react-confirm-alert.css";

const ListUser = (props) => (
  <Query
    query={gql`
    query allReports($phn: String, $nid: String){
      
      allReports(
        filter : {
          OR : [{
            phoneid : $phn
          }, {
            phoneid : $nid
          }
          ]
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
    `}
    variables={
      {
        phn : props.state.phone,
        nid : props.state.nid
      }
    }
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

class UserReport extends React.Component {

  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.back = this.back.bind(this);
    
    if (typeof(props.history.location.state) == 'undefined' || props.history.location.state == null) {
      this.props.history.push({
        pathname: '/unauth',
      });
    }
    else {
        this.state = {
        modal: false,
        viewPresciptionId: null,
        logInfoId : this.props.history.location.state.logInfo[0],
        logInfoToken : this.props.history.location.state.logInfo[1],
        phone : this.props.history.location.state.logInfo[3],
        nid : this.props.history.location.state.logInfo[2],
        uname : this.props.history.location.state.logInfo[4],
        
      }
    }

  }

  back() {
    this.props.history.push({
      pathname: '/userdashboard',
      state : {logInfo: [this.state.logInfoToken, 
        this.state.logInfoId,
        this.state.phone,
        this.state.nid,
        this.state.uname
      ] }
    });
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
      
      </Navbar>
      <div>
      <Row className="helper">

      <ListUser toggle={this.toggle} state={this.state} delete={this.delete} preDelete={this.preDelete} up={this.up}/>
      </Row>
      <Button type="submit" value="Submit" color="info" className="searchBtHelper" onClick={this.back}><i className="fa fa-angle-double-left "/> &nbsp;Back</Button>
      </div>
      </div>
    );
  }
}

export default UserReport;

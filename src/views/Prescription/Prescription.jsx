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
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import ReactLoading from 'react-loading';
import {client} from "../../index";

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
            <Button color="danger" onClick={() => {props.delete(id)}}>Delete</Button>
            
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
    this.delete = this.delete.bind(this);
  }

  toggle(viewPresciptionId) {
    this.setState({
      modal: !this.state.modal,
      viewPresciptionId
    });
  }

  async delete(viewPresciptionId){
    const obj = await client.mutate({
      mutation: gql`
          mutation deletePrescription($id: ID!) {
            deletePrescription(id: $id) {
              owner
            }
          }
      `,
      variables: {
          id : viewPresciptionId
      }
  });
  console.log(obj.data);
  
}

//   Delete = () => (
//   <Mutation
//   mutation={gql`
//   mutation deletePrescription(
//     $id: String!,
//    ){
//       deletePrescription(
//         id: $id,
//       ){
//         owner
//       }
//     }
//   `}
//   variables = {{
//     id: this.state.viewPresciptionId,
//   }}
// >
// {({data, loading, error}) => {
//   if (loading) return <div>
//   <ReactLoading className="loadingScreenAnimation" type={'spin'} color={'white'} height={'60%'} width={'60%'} />
//   </div>;
//   if (data) return  <div className="successCreateNoify">
//     <Card className="successCreateNoifyHelper" style={{width: '30rem'}}>
//       <CardImg top src="https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png" alt="Card image cap" />
//       <CardTitle>Prescription Created Successfully!!</CardTitle>
//       <CardText>
//       Prescription ID : <b>{data.deletePrescription.owner}</b>< br />
//       </CardText>
//       <Button href="/cp">Back</Button>
//     </Card>
//    </div> ;
//   if (error) return <p>Error :(</p>;
//   return  <div>
//     Alhamdulillah
//   </div>;
//         }}
//     </Mutation>

// );

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

      <ListUser toggle={this.toggle} state={this.state} delete={this.delete}/>

      </Row>
      </div>
      </div>
    );
  }
}

export default Prescription;

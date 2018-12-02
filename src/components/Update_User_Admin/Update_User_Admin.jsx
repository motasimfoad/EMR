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
  FormGroup,
  Label,
  Input,
  Alert
 } from "reactstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import ReactLoading from 'react-loading';

class Update_User_Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.history.location.state.some[0],
      createdAt: props.history.location.state.some[1],
      updatedAt: props.history.location.state.some[2],
      phone: props.history.location.state.some[3],
      nid: props.history.location.state.some[4],
      name: props.history.location.state.some[5],
      utype: props.history.location.state.some[6],
      email: props.history.location.state.some[7],
      
};
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.id]: evt.target.value });
  }

  render() {
   return (
      
   <div className="content">

      <Mutation
      mutation={gql`
      mutation updateUser(
        $id : ID!,
        $phone: String!,
        $nid: String,
        $name: String!,
        $utype: String!,
       
       ){
          updateUser(
              id : $id,
            phone : $phone,
            nid  : $nid ,
            name  : $name,
            utype   : $utype,
           
          ){
            id
            name
            email
            phone
           }
        }
      `}
      variables = {{
        id : this.state.id,
        phone: this.state.phone,
        nid: this.state.nid,
        name: this.state.name,
        utype: this.state.utype,
       
      }}
  >
    {(updateUser, {data, loading, error}) => {
      if (loading) return <div>
      <ReactLoading className="loadingScreenAnimation" type={'spin'} color={'white'} height={'60%'} width={'60%'} />
      </div>;
      if (data) return  <div className="successCreateNoify">
        <Card className="successCreateNoifyHelper" style={{width: '30rem'}}>
          <CardImg top src="https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png" alt="Card image cap" />
          <CardTitle>User Info Updated Successfully!!</CardTitle>
          <CardText>
          User ID : <b>{data.updateUser.id}</b>< br />
          Name : <b>{data.updateUser.name}</b>< br />
          Email : <b>{data.updateUser.email}</b>< br />
          Contact No : <b>{data.updateUser.phone}</b>< br />
          </CardText>
          
        </Card>
       </div> ;
      if (error) return <p>Error :(</p>;
       
        
      return  <Row>
      <Col md={12}>
        <Card>
          <CardHeader>
            <h5 className="title">Update User Information</h5>
            <Alert color="warning"><b>Input fields are already filled with existing user data</b> </Alert>
         </CardHeader>
          <CardBody>
          <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <FormGroup className="col-md-6">
              <Label for="pname">User Name</Label>
              <Input type="text"  id="name" placeholder={this.state.name} onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label for="nid">ID/ NID / Passpost No / Birth Cirtificate No</Label>
              <Input type="text"  id="nid" placeholder={this.state.nid} onChange={this.handleChange}/>
            </FormGroup>
          </div>
          <div className="form-row">
            <FormGroup className="col-md-6">
              <Label for="docname">User Id (System)</Label>
              <Input type="text"  id="id" placeholder={this.state.id} onChange={this.handleChange} disabled/>
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label for="drid">Created At</Label>
              <Input type="text"  id="createdAt" placeholder={this.state.createdAt} onChange={this.handleChange} disabled/>
            </FormGroup>
          </div>
          <div className="form-row">
            <FormGroup className="col-md-6">
            <Label for="inputAddress">Updated At</Label>
            <Input type="text"  id="updatedAt" placeholder={this.state.updatedAt} onChange={this.handleChange} disabled/>
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label for="phnno">User contact no</Label>
              <Input type="text"  id="phone" placeholder={this.state.phone} onChange={this.handleChange}/>
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="inputDetails">User Role</Label>
            <Input type="text"  id="utype" placeholder={this.state.utype} onChange={this.handleChange}/>
          </FormGroup>
          <div className="form-row">
            <FormGroup className="col-md-12">
              <Label for="inputMed">Email</Label>
              <Input type="text"  id="email" placeholder={this.state.email} onChange={this.handleChange} disabled/>
            </FormGroup>
          
          </div>
          
          <Button type="submit" value="Submit" color="success" size="lg" onClick={()=>{updateUser()}}><i className="fa fa-save"/> &nbsp;Update</Button>
        </form>
                </CardBody>
              </Card>
            </Col>
          </Row>;
            }}
        </Mutation>

    </div>
    );
  }
}

export default Update_User_Admin;

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
  Input
 } from "reactstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import ReactLoading from 'react-loading';
import Footer from "../../components/Footer/Footer.jsx";

class CP_doc extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pname: '',
      nid: '',
      inputAddress: '',
      phnno: '',
      inputDetails: '',
      inputMed: ''
};
      this.handleChange = this.handleChange.bind(this);
      this.back = this.back.bind(this);

      if (typeof(props.history.location.state) == 'undefined' || props.history.location.state == null) {
        this.props.history.push({
          pathname: '/unauth',
        });
      }
      else {
          this.state = {
            drid : this.props.history.location.state.logInfo[0],
          logInfoToken : this.props.history.location.state.logInfo[1],
          docname : this.props.history.location.state.logInfo[2]
        }
          console.log(this.state.uname);
      }

  }

  back() {
    this.props.history.push({
      pathname: '/docdash',
      state: { logInfo: [this.state.drid, 
        this.state.logInfoToken,
        this.state.docname
      ] }
    });
  }

  handleChange(evt) {
    this.setState({ [evt.target.id]: evt.target.value });
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
          <Button onClick={this.back}>Back</Button>
        </Card>
       </div> ;
      if (error) return <p>Invalid Docor Id</p>;
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
              <Input type="text"  id="docname" placeholder={this.state.docname} onChange={this.handleChange} disabled/>
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label for="drid">Doctors ID</Label>
              <Input type="text"  id="drid" placeholder={this.state.drid} onChange={this.handleChange} disabled/>
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
          <Button type="submit" value="Submit" color="success" size="lg" onClick={this.back}><i className="fa fa-angle-double-left "/> &nbsp;Back</Button>
        </form>
                </CardBody>
              </Card>
            </Col>
          </Row>;
            }}
        </Mutation>
< Footer />
    </div>
    );
  }
}

export default CP_doc;

import React from "react";
import { 
  Card, 
  CardTitle, 
  Row, 
  Col,
  CardImg,
  CardBody
 } from "reactstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import Footer from "../../components/Footer/Footer";


class UserDashboard extends React.Component {

  constructor(props) {
    super(props);
    
    this.back = this.back.bind(this);
    this.search = this.search.bind(this);
    this.cp = this.cp.bind(this);
    this.searchReport = this.searchReport.bind(this);

    if (typeof(props.history.location.state) == 'undefined' || props.history.location.state == null) {
      this.props.history.push({
        pathname: '/unauth',
      });
    }
    else {
        this.state = {
        logInfoToken : this.props.history.location.state.logInfo[0],
        logInfoId : this.props.history.location.state.logInfo[1],
        phone : this.props.history.location.state.logInfo[2],
        nid : this.props.history.location.state.logInfo[3],
        uname : this.props.history.location.state.logInfo[4],
      }
     }
   
  }


  back() {
    this.props.history.push({
      pathname: '/auth'
     
    });
  }

  cp() {
    this.props.history.push({
      pathname: '/cp_user',
      state: { logInfo: [this.state.nid, 
        this.state.logInfoToken,
        this.state.uname,
        this.state.phone
      ] }
    });
  }

  
 search() {
    this.props.history.push({
      pathname: '/userprescription',
      state: { logInfo: [this.state.logInfoId, 
        this.state.logInfoToken,
        this.state.nid,
        this.state.phone,
        this.state.uname] }
    });
  }

  searchReport() {
    this.props.history.push({
      pathname: '/userreport',
      state: { logInfo: [this.state.logInfoId, 
        this.state.logInfoToken,
        this.state.nid,
        this.state.phone,
        this.state.uname] }
    });
  }



  render() {
    return (
      <div className="ddmain">
      <img src ="https://img10.androidappsapk.co/300/0/d/4/com.outpatient.williamosler.png" />
      <h3>Welcome  <b>{this.state.uname}</b> !!</h3>
          <Row className="ddcenterbuttongroup">
            <Col sm="4">
            <Card >
              <CardImg top src="https://us.123rf.com/450wm/hilch/hilch1802/hilch180200503/94767811-date-and-time-calendar-and-add-event-thin-line-flat-color-icon-vector-illustration-pictogram-isolate.jpg?ver=6" alt="..."/>
              <CardBody>
                  <CardTitle>Add Prescription / Report</CardTitle>
                  <pre>You will find this files under view report section</pre>
                  <Button onClick={this.cp} color="primary">Add</Button>
              </CardBody>
            </Card>
            </Col>
            <Col sm="4">
            <Card >
              <CardImg top src="https://cdn.dribbble.com/users/77712/screenshots/1170246/flat_read.png" alt="..."/>
              <CardBody>
              <CardTitle>View Prescription/Report</CardTitle>
                  <Button onClick={this.search} color="primary">Prescription</Button>
                  <Button onClick={this.searchReport} color="primary">Report</Button>
              </CardBody>
            </Card>
            </Col>
            <Col sm="4">
            <Card >
              <CardImg top src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Circle-icons-power.svg/1024px-Circle-icons-power.svg.png" alt="..."/>
              <CardBody>
                  <CardTitle>Log Out</CardTitle>
                  <Button onClick={this.back} color="primary" >Log Out</Button>
              </CardBody>
            </Card>
            </Col>
          </Row>
        <Footer />
      </div>
     );
  }
  
}

export default UserDashboard;

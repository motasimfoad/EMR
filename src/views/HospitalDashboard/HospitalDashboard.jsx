import React from "react";
import { 
  Card, 
  CardTitle, 
  CardText, 
  Row, 
  Col,
  CardImg,
  CardBody
  
 

} from "reactstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import Footer from "../../components/Footer/Footer";
import { timesSeries } from "async";

class HospitalDashboard extends React.Component {

  constructor(props) {
    super(props);
    
    this.back = this.back.bind(this);
    this.search = this.search.bind(this);
    this.cp = this.cp.bind(this);
    this.sr = this.sr.bind(this);

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
        console.log(this.state.logInfoId);
        console.log(this.state.logInfoToken);
        console.log(this.state.uname);
        console.log(this.state.phone);
        console.log(this.state.nid);
        
        
        
        
    }
   
  }


  back() {
    this.props.history.push({
      pathname: '/auth'
     
    });
  }

  cp() {
    this.props.history.push({
      pathname: '/cp_hospital',
      state: { logInfo: [this.state.nid, 
        this.state.logInfoToken,
        this.state.uname,
        this.state.phone
      ] }
    });
  }

  search() {
    this.props.history.push({
      pathname: '/search',
      state: { logInfo: [this.state.logInfoId, 
        this.state.logInfoToken,
        this.state.nid,
        this.state.phone,
        this.state.uname] }
    });
  }

  sr() {
    this.props.history.push({
      pathname: '/searchreport',
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
      <img style={{width : 300}} src ="https://images.vexels.com/media/users/3/144223/isolated/preview/f1d0807f8ffad0197757d840bdc97d0b--cone-do-registro-m-dico-by-vexels.png" />
      <h3>Welcome  <b>{this.state.uname}</b> !!</h3>
        <Row className="ddcenterbuttongroup">
      <Col sm="4">
      <Card >
        <CardImg top src="https://us.123rf.com/450wm/hilch/hilch1802/hilch180200503/94767811-date-and-time-calendar-and-add-event-thin-line-flat-color-icon-vector-illustration-pictogram-isolate.jpg?ver=6" alt="..."/>
        <CardBody>
            <CardTitle>Add Report</CardTitle>
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
            <Button onClick={this.sr} color="primary">Report</Button>
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

export default HospitalDashboard;

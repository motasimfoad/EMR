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

class Docdash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     

    };

    this.back = this.back.bind(this);
   
  }


  back() {
    this.props.history.push({
      pathname: '/auth',
    });
  }



  render() {
    return (
      <div className="ddmain">
      <img src ="https://images.vexels.com/media/users/3/144185/isolated/lists/a9075b02366ea61e8995f8d5b08d0267-flat-doctor-cartoon.png" />
      <h3>Welcome Doctor <b>Someone</b> !!</h3>
        <Row className="ddcenterbuttongroup">
      <Col sm="4">
      <Card >
        <CardImg top src="https://us.123rf.com/450wm/hilch/hilch1802/hilch180200503/94767811-date-and-time-calendar-and-add-event-thin-line-flat-color-icon-vector-illustration-pictogram-isolate.jpg?ver=6" alt="..."/>
        <CardBody>
            <CardTitle>Add Prescription</CardTitle>
            <Button color="primary">Add</Button>
        </CardBody>
      </Card>
      </Col>
      <Col sm="4">
      <Card >
        <CardImg top src="https://cdn.dribbble.com/users/77712/screenshots/1170246/flat_read.png" alt="..."/>
        <CardBody>
            <CardTitle>Search Prescription</CardTitle>
            <Button color="primary">Search</Button>
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

export default Docdash;

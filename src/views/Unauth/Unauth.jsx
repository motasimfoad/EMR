import React from "react";
import { 
  Button
 } from "reactstrap";

class Unauth extends React.Component {

  constructor(props) {
    super(props);
     this.back = this.back.bind(this);
  }


  back() {
    this.props.history.push({
      pathname: '/auth',
    });
  }

  render() {
    return (
      <div className="unauthMain">
       <img className="unauthImg" src="https://cdn.shopify.com/s/files/1/2439/4751/products/No_Access_1024x1024.jpg?v=1507696736" alt="Unauthoized"/>
       <h1>Unauthorizes Access !!</h1>
       <Button onClick={this.back}>Get Authorized</Button>
      </div>
     
     
    );
  }
  
}

export default Unauth;

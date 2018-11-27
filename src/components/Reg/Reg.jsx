import React from "react";

import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://api.graph.cool/simple/v1/cjnaaji6g014p0127lqfjvz73', {
 headers : {

 }
});

class Reg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       email: "rid@wan2.com",
       password : "llalal"
      
};
      this.handleChange = this.handleChange.bind(this);
      this.reg = this.reg.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.id]: evt.target.value });
  }

  reg() {
    return client.request(`
     mutation(
       $email : String!
       $pass : String!
     ){
      createUser(
        authProvider : {
          email : {
            email : $email
            password : $pass
          }
        }
        
      ){
        id
      }
    }
   
  `,
  {
    email : this.state.email,
    pass : this.state.password
  })
 }

  render() {
   return (
      
   <div className="content">
   <button onClick={this.reg}>Reg</button>
   </div>

    );
  }
}

export default Reg;

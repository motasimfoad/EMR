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
// import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import ReactLoading from 'react-loading';
import Footer from "../Footer/Footer.jsx";
import { graphql, gql } from 'react-apollo';
import Dropzone from 'react-dropzone';
import {client} from "../../index";

class CP_Hospital extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pname: '',
      nid: '',
      inputAddress: '',
      phoneid: '',
      inputDetails: '',
      inputMed: ''
};
      //this.handleChange = this.handleChange.bind(this);
      this.back = this.back.bind(this);
      this.submit = this.submit.bind(this);

      if (typeof(props.history.location.state) == 'undefined' || props.history.location.state == null) {
        this.props.history.push({
          pathname: '/unauth',
        });
      }
      else {
          this.state = {
            hospitalId : this.props.history.location.state.logInfo[0],
            logInfoToken : this.props.history.location.state.logInfo[1],
            hospitalName : this.props.history.location.state.logInfo[2],
            phnno : this.props.history.location.state.logInfo[3],
        }
          
      }

  }

  back() {
    this.props.history.push({
      pathname: '/hospitaldashboard',
      state: { logInfo: [this.state.drid, 
        this.state.logInfoToken,
        this.state.docname
      ] }
    });
  }

  // handleChange(evt) {
  //   this.setState({ [evt.target.id]: evt.target.value });
  // }

  render() {

    return (

   <div className="content">
     <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.phoneid}
            placeholder='Description'
            onChange={(e) => this.setState({phoneid: e.target.value})}
          />
          {!this.state.imageId &&
          <Dropzone
            onDrop={this.onDrop}
            accept='image/*'
            multiple={false}
          >
            <div>Drop an image or click to choose</div> {this.state.imageId} {this.state.imageUrl}
          </Dropzone>}
          {this.state.imageUrl &&
            <img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
          }
          {this.state.phnno && this.state.imageUrl &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.submit}>Post</button>
          }
        </div>
      </div>

      
< Footer />
    </div>
    );
    
  }
  onDrop = (files) => {
    // prepare form data, use data key!
    let data = new FormData()
    data.append('data', files[0])

    // use the file endpoint
    fetch(' https://api.graph.cool/file/v1/cjnaaji6g014p0127lqfjvz73', {
      method: 'POST',
      body: data
    }).then(response => {
      return response.json()
    }).then(image => {
      this.setState({
        imageId: image.id,
        imageUrl: image.url,
      })
    })
  }

  handlePost = async () => {
    await client.mutate({
      mutation: gql`
         mutation createReport($imageID: String, $imageUrl: String,  $phoneid: String){
          createReport(
           imageid : $imageID ,
           imageUrl : $imageUrl ,
           phoneid : $phoneid
        ) {
          id
          phoneid
        }
      }
      `,
      
      variables: {
        imageID: this.state.nid,
        imageUrl: this.state.imageUrl,
        phoneid: this.state.phoneid
      },
  
    })
    .then(result => { 
      alert(result.data.createReport.id)
      console.log(result.data.createReport.phoneid);
      
     })
    .catch(error => { console.log(error)});
}

 async submit(){
  await client.mutate({
    mutation: gql`
       mutation createReport($imageID: String, $imageUrl: String,  $phoneid: String){
        createReport(
         imageid : $imageID ,
         imageUrl : $imageUrl ,
         phoneid : $phoneid
      ) {
        id
        phoneid
      }
    }
    `,
    
    variables: {
      imageID: this.state.nid,
      imageUrl: this.state.imageUrl,
      phoneid: this.state.phoneid
    },

  })
  .then(result => { 
    alert(result.data.createReport.id)
    console.log(result.data.createReport.phoneid);
    
   })
  .catch(error => { console.log(error)});
}

}

// const addMutation = gql`
//   mutation addPost($imageid: String!, $imageUrl: ID!) {
//     createPost(imageid: $imageid, imageUrl: $imageUrl) {
//       id
//       imageUrl
//       imageid
//       }
//     }
//   }
// `

//const PageWithMutation = graphql(addMutation, { name: 'addPost' })(CP_Hospital)

// export default withRouter(PageWithMutation)

export default CP_Hospital;

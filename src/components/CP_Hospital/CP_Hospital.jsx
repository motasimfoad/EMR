import React from "react";
import {
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter ,
  Input
 } from "reactstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import gql from "graphql-tag";
import Footer from "../Footer/Footer.jsx";
import Dropzone from 'react-dropzone';
import {client} from "../../index";


class CP_Hospital extends React.Component {

  constructor(props) {
    super(props);

      this.back = this.back.bind(this);
      this.submit = this.submit.bind(this);
      this.lo = this.lo.bind(this);
      this.toggle = this.toggle.bind(this);

      if (typeof(props.history.location.state) == 'undefined' || props.history.location.state == null) {
        this.props.history.push({
          pathname: '/unauth',
        });
      }
      else {
          this.state = {
            modal: false,
            phoneid: '',
            hospitalId : this.props.history.location.state.logInfo[0],
            logInfoToken : this.props.history.location.state.logInfo[1],
            hospitalName : this.props.history.location.state.logInfo[2],
            phnno : this.props.history.location.state.logInfo[3],
        }
          
      }

  }

  lo() {
    this.props.history.push({
      pathname: '/auth'
     
    });
  }

  back() {
    this.props.history.push({
      pathname: '/hospitaldashboard',
      state: { logInfo: [this.state.hospitalId, 
        this.state.logInfoToken,
        this.state.hospitalName,
        this.state.phnno,
      ] }
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {

    return (

   <div className="cphelperMain">
        <h2>Add prescription for a Patient</h2>
        <pre className="cpHospitalText">Enter the patients NID/Birth Cirtificate no/ Passport No/ Phone No. <br/>
        Upload the image of your prescription.<br/>
        The submit button will automatically apper on your screen.
        </pre>
        <div style={{ maxWidth: 400 }} className='cphelperAfterMain'>
          <Input
            className='cpHospitalInput'
            value={this.state.phoneid}
            placeholder='NID/Birth Cirtificate no/ Passport No/ Phone No'
            onChange={(e) => this.setState({phoneid: e.target.value})}
          />
          <br/>
          {!this.state.imageId &&
          <Dropzone
            className="dz"
            onDrop={this.onDrop}
            accept='image/*'
            multiple={false}
          >
            <div><b>Drop an image or click to choose</b></div> 
          </Dropzone>}
          {this.state.imageUrl &&
            <img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
          }
          {this.state.phnno && this.state.imageUrl &&
            <Button color="success" className="searchBtHelper" onClick={this.submit}><i className="fa fa-hdd "/> &nbsp;Post</Button>
          }
          <Button type="submit" value="Submit" color="info" className="searchBtHelper" onClick={this.back}><i className="fa fa-angle-double-left "/> &nbsp;Back</Button>
          <Button type="submit" value="Submit" color="danger" className="searchBtHelper" onClick={this.lo}><i className="fa fa-sign-out-alt "/> &nbsp;Log Out</Button>
        
          
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}></ModalHeader>
            <ModalBody className="crhosCenter">
              <img src ="https://nazrangrad.ru/wp-content/uploads/2018/01/check-mark-2180770_960_720.png" />
              <br />
              <br />
            <h3>Report Successfully Added</h3>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.back}>Back</Button>
              <Button color="danger" onClick={this.lo}>Logout</Button>
            </ModalFooter>
          </Modal>
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
        imageUrl
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
    this.toggle();
  } 
    


   
    
    
   )
  .catch(error => { console.log(error)});
};

}

export default CP_Hospital;

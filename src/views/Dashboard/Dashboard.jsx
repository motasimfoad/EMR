import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// react plugin used to create charts
import {  Pie,  Bar } from "react-chartjs-2";
// function that returns a color based on an interval of numbers

import Stats from "components/Stats/Stats.jsx";
import {client} from "../../index";

import gql from "graphql-tag";
import { Query } from "react-apollo";

const USER_COUNT = gql`
 {
      userCount: _allUsersMeta {
        count
      }
    }
`;

const REP_COUNT = gql`
 {
      reportCount: _allReportsMeta {
        count
      }
    }
`;

const PRES_COUNT = gql`
 {
        prescriptionCount: _allPrescriptionsMeta {
        count
      }
   }
`;

class Dashboard extends React.Component  {
   
 constructor(props) {
    super(props);
    if (typeof(props.history.location.state) == 'undefined' || props.history.location.state == null) {
      this.props.history.push({
        pathname: '/unauth',
      });
    } else {

      this.state = {
        logInfoId : this.props.history.location.state.logInfo[1],
        logInfoToken : this.props.history.location.state.logInfo[0],
        patient : '',
        doctor : '',
        pharmacy : '',
        hospital : '',
        admin : '',
        rep : '',
        pres : ''
      }
    }
}

componentDidMount() {
  client.query({
    query: gql`
       {
        userCount: _allUsersMeta(
          filter : {
            utype : "Patient"
          }
        ) {
          count
        }
      }
    `,
    
  })
  .then(result => { 
    this.setState({
      patient: result.data.userCount.count
    });
})
  .catch(error => { console.log(error) });

   client.query({
    query: gql`
       {
        userCount: _allUsersMeta(
          filter : {
            utype : "Doctor"
          }
        ) {
          count
        }
      }
    `,
    
  })
  .then(result => { 
    this.setState({
      doctor : result.data.userCount.count
    });
})
  .catch(error => { console.log(error) });

 client.query({
    query: gql`
       {
        userCount: _allUsersMeta(
          filter : {
            utype : "Hospital"
          }
        ) {
          count
        }
      }
    `,
    
  })
  .then(result => { 
    this.setState({
      hospital : result.data.userCount.count
    });
})
  .catch(error => { console.log(error) });

 client.query({
    query: gql`
       {
        userCount: _allUsersMeta(
          filter : {
            utype : "Pharmacy"
          }
        ) {
          count
        }
      }
    `,
    
  })
  .then(result => { 
    this.setState({
      pharmacy : result.data.userCount.count
    });
})
  .catch(error => { console.log(error) });

 client.query({
    query: gql`
       {
        userCount: _allUsersMeta(
          filter : {
            utype : "Admin"
          }
        ) {
          count
        }
      }
    `,
    
  })
  .then(result => { 
    this.setState({
      admin : result.data.userCount.count
    });
})
  .catch(error => { console.log(error) });

client.query({
    query: gql`
      {
      reportCount: _allReportsMeta {
        count
      }
    }
    `,
    
  })
  .then(result => { 
    this.setState({
      rep : result.data.reportCount.count
    });
})
  .catch(error => { console.log(error) });

  client.query({
    query: gql`
       {
        prescriptionCount: _allPrescriptionsMeta {
        count
      }
   }
    `,
    
  })
  .then(result => { 
    this.setState({
      pres : result.data.prescriptionCount.count
    });
})
  .catch(error => { console.log(error) });

}

  
  render() {

    const preVsRep = {
      data: canvas => {
        return {
          labels: ["Report", "Prescription"],
          datasets: [
            {
              backgroundColor: ["#2ecc71", "#ef8157"],
              data: [this.state.rep, this.state.pres]
            }
          ],
          options: {
              scales: {
                  xAxes: [{
                      stacked: true,
                  }],
                  yAxes: [{
                      stacked: true
                  }]
              }
          }
        };
      },
    };
  
    const dashboardEmailStatisticsChart = {

      data: canvas => {
        return {
          labels: ["Patient", "Doctor", "Hospital", "Pharmacy", "Admin"],
          datasets: [
            {
              label: "Users Record (Role Based)",
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157", "#2ecc71"],
              borderWidth: 0,
              data: [this.state.patient, this.state.doctor, this.state.hospital, this.state.pharmacy, this.state.admin]
            }
          ]
        };
      },
      options: {
        legend: {
          display: true
        },
    
        pieceLabel: {
          render: "percentage",
          fontColor: ["white"],
          precision: 2
        },
    
        tooltips: {
          enabled: true
        },
    
        scales: {
          yAxes: [
            {
              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "rgba(255,255,255,0.05)"
              }
            }
          ],
    
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false
              }
            }
          ]
        }
      }
    };

    return (
      <div className="content">
        <Row>
          <Col xs={12} sm={6} md={6} lg={3}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs={5} md={4}>
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col xs={7} md={8}>
                    <div className="numbers">
                      <p className="card-category">Allocated Server Capacity</p>
                      <CardTitle tag="p">500MB</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[
                    {
                      i: "fas fa-sync-alt",
                      t: "Currently Updated"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={3}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs={5} md={4}>
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-single-02 text-success" />
                    </div>
                  </Col>
                  <Col xs={7} md={8}>
                    <div className="numbers">
                      <p className="card-category">Total User Registered</p>
                      <CardTitle tag="p">
                      <Query query={USER_COUNT}>
                        {({ loading, error, data }) => {
                          if (loading) return "Loading...";
                          if (error) return `Error! ${error.message}`;

                          return (
                            data.userCount.count
                          );
                        }}
                      </Query>
                      </CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[
                    {
                      i: "fas fa-clock",
                      t: "Data showing from your last login"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={3}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs={5} md={4}>
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-credit-card text-danger" />
                    </div>
                  </Col>
                  <Col xs={7} md={8}>
                    <div className="numbers">
                      <p className="card-category">Total Reports </p>
                      <CardTitle tag="p">
                      <Query query={REP_COUNT}>
                        {({ loading, error, data }) => {
                          if (loading) return "Loading...";
                          if (error) return `Error! ${error.message}`;

                          return (
                            data.reportCount.count
                          );
                        }}
                      </Query>
                      </CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[
                    {
                      i: "fas fa-clock",
                      t: "Data showing from your last login"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={3}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs={5} md={4}>
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-single-copy-04 text-primary" />
                    </div>
                  </Col>
                  <Col xs={7} md={8}>
                    <div className="numbers">
                      <p className="card-category">Total Prescriptions</p>
                      <CardTitle tag="p">
                      <Query query={PRES_COUNT}>
                        {({ loading, error, data }) => {
                          if (loading) return "Loading...";
                          if (error) return `Error! ${error.message}`;
                       

                          return (
                           data.prescriptionCount.count
                           );
                        }}
                      </Query>
                      </CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[
                    {
                      i: "fas fa-clock",
                      t: "Data showing from your last login"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12}  >
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
                <p className="card-category">Data showing from your last login</p>
              </CardHeader>
              <CardBody>
                <Pie
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                  height = {80}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-gray" /> Patient{" "}
                  <i className="fa fa-circle text-primary" /> Doctor{" "}
                  <i className="fa fa-circle text-warning" /> Hospital{" "}
                  <i className="fa fa-circle text-danger" /> Pharmacy{" "}
                  <i className="fa fa-circle text-success" /> Admin{" "}
                </div>
                <hr />
                <Stats>
                  {[
                    {
                      i: "fas fa-calendar-alt",
                      t: " Number of users"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle>Report Vs Prescription Comparison</CardTitle>
                <p className="card-category"> Data showing from your last login</p>
              </CardHeader>
              <CardBody>
                <Bar data={preVsRep.data} options={{
		maintainAspectRatio: false
	}} type='bar' height={200}/>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
        
          
         </Row>
      </div>
    );
  }
}

export default Dashboard;

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
import { Line, Pie } from "react-chartjs-2";
// function that returns a color based on an interval of numbers

import Stats from "components/Stats/Stats.jsx";
import {client} from "../../index";

import {
  dashboard24HoursPerformanceChart,
 
  dashboardNASDAQChart
} from "variables/charts.jsx";
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
         lo : ''
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
      lo: result.data.userCount.count
    });
})
  .catch(error => { console.log(error) });
}

  
  render() {
  
    const dashboardEmailStatisticsChart = {

      data: canvas => {
        return {
          labels: [1, 2, 3, 4],
          datasets: [
            {
              label: "Emails",
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
              borderWidth: 0,
              data: [this.state.lo, 20, 30, 10]
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
        {/* <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle>Users Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[
                    {
                      i: "fas fa-history",
                      t: " Updated 3 minutes ago"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
        </Row> */}
        <Row>
          <Col xs={12} sm={12} md={4}>
            <Card>
              <CardHeader>
                <CardTitle>Email Statistics</CardTitle>
                <p className="card-category">Last Campaign Performance</p>
              </CardHeader>
              <CardBody>
                <Pie
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <Stats>
                  {[
                    {
                      i: "fas fa-calendar-alt",
                      t: " Number of emails sent"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={8}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle>NASDAQ: AAPL</CardTitle>
                <p className="card-category">Line Chart With Points</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <Stats>
                  {[
                    {
                      i: "fas fa-check",
                      t: " Data information certified"
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
         </Row>
      </div>
    );
  }
}

export default Dashboard;

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

import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
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
         lo : '50'
      }
    }
}
  
  render() {
  
    const chartColor = '#FFFFFF';

      const data = (canvas) => {
          var ctx = canvas.getContext("2d");

          var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
          gradientStroke.addColorStop(0, '#80b6f4');
          gradientStroke.addColorStop(1, chartColor);

          var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
          gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
          gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
          return {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [{
                  label: "Active Users",
                  borderColor: "#f96332",
                  pointBorderColor: "#FFF",
                  pointBackgroundColor: "#f96332",
                  pointBorderWidth: 2,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 1,
                  pointRadius: 4,
                  fill: true,
                  backgroundColor: gradientFill,
                  borderWidth: 2,
                  data: [this.state.lo, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
              }]
          }
      };
      const options = {
          maintainAspectRatio: false,
          legend: {
              display: false
          },
          tooltips: {
              bodySpacing: 4,
              mode:"nearest",
              intersect: 0,
              position:"nearest",
              xPadding:10,
              yPadding:10,
              caretPadding:10
          },
          responsive: 1,
          scales: {
              yAxes: [{
                  display:0,
                  ticks: {
                      display: false
                  },
                  gridLines: {
                      zeroLineColor: "transparent",
                      drawTicks: false,
                      display: false,
                      drawBorder: false
                  }
              }],
              xAxes: [{
                  display:0,
                  ticks: {
                      display: false
                  },
                  gridLines: {
                      zeroLineColor: "transparent",
                      drawTicks: false,
                      display: false,
                      drawBorder: false
                  }
              }]
          },
          layout:{
              padding:{left:0,right:0,top:15,bottom:15}
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
                            <div>{data.userCount.count}</div>
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
                            <div>{data.reportCount.count}</div>
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
                            <div>{data.prescriptionCount.count}</div>
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
        </Row>
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
          <Col>
          <Card>
          <Line data={data} options={options} />
          </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;

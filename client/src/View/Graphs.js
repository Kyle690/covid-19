import React from "react";
import {connect}from 'react-redux';
import {Container, Row, Col, Card} from "react-bootstrap";
import {BarChart,LineChart} from "../Components/Charts";
import {DataArr} from "../Functions";
import {blue,lightBlue,green,lightGreen,yellow,lightYellow,red,lightRed} from "../Constants";

const Graphs =({data})=>{

    const dataArr = DataArr(data)

    return (
        <Container style={{padding:15}}>
            <Row style={{paddingTop:15}}>
                <Col>
                    <Card text={'info'}>
                        <Card.Header>
                            <h4>Confirmed Cases</h4>
                        </Card.Header>
                        <Card.Body>
                            <LineChart
                                labels={dataArr.date}
                                datasets={[
                                    {
                                        label:'Confirmed',
                                        data:dataArr.confirmed,
                                        backgroundColor:lightBlue,
                                        borderColor:blue ,
                                        borderWidth: 1,

                                    },
                                    {
                                        label:'Deaths',
                                        data:dataArr.deaths,
                                        backgroundColor: lightRed,
                                        borderColor: red,
                                        borderWidth: 1,
                                    },
                                    {
                                        label:'Active',
                                        data:dataArr.active,
                                        backgroundColor: lightGreen,
                                        borderColor:green,
                                        borderWidth: 1,


                                    }
                                ]}
                            />
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
            <Row style={{paddingTop:15}}>
                <Col sm={12} md={6}>
                    <Card text={'info'}>
                        <Card.Header>
                            <h4>Confirmed</h4>
                        </Card.Header>
                        <Card.Body>
                            <LineChart
                                labels={dataArr.date}
                                datasets={[
                                    {
                                        label:'Confirmed',
                                        data:dataArr.confirmed,
                                        backgroundColor:blue,
                                        borderColor: lightBlue,
                                        borderWidth: 1,
                                        fill:false
                                    },
                                    {
                                        label:'Difference',
                                        data:dataArr.difference,
                                        backgroundColor:green,
                                        borderColor: lightGreen,
                                        borderWidth: 1,
                                        fill:false
                                    }
                                ]}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6}>
                    <Card text={'success'}>
                        <Card.Header>
                            <h4>Active</h4>
                        </Card.Header>
                        <Card.Body>
                            <LineChart
                                labels={dataArr.date}
                                datasets={[
                                    {
                                        label:'Active',
                                        data:dataArr.active,
                                        backgroundColor:green,
                                        borderColor: lightGreen,
                                        borderWidth: 1,
                                        fill:false
                                    },
                                    {
                                        label:'Active Difference',
                                        data:dataArr.dailyActive,
                                        backgroundColor:blue,
                                        borderColor: lightBlue,
                                        borderWidth: 1,
                                        fill:false
                                    }
                                ]}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{paddingTop:15}}>
                <Col sm={12} md={6}>
                    <Card text={'danger'}>
                        <Card.Header>
                            <h4>Deaths</h4>
                        </Card.Header>
                        <Card.Body>
                            <LineChart
                                labels={dataArr.date}
                                datasets={[
                                    {
                                        label:'Deaths',
                                        data:dataArr.deaths,
                                        backgroundColor:red,
                                        borderColor: lightRed,
                                        borderWidth: 1,
                                        fill:false
                                    },
                                    {
                                        label:'Death Difference',
                                        data:dataArr.dailyDeaths,
                                        backgroundColor:yellow,
                                        borderColor: lightYellow,
                                        borderWidth: 1,
                                        fill:false
                                    }
                                ]}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6}>
                    <Card text={'warning'}>
                        <Card.Header>
                            <h4>Recoveries</h4>
                        </Card.Header>
                        <Card.Body>
                            <LineChart
                                labels={dataArr.date}
                                datasets={[
                                    {
                                        label:'Recoveries',
                                        data:dataArr.recoveries,
                                        backgroundColor:yellow,
                                        borderColor: lightYellow,
                                        borderWidth: 1,
                                        fill:false
                                    },
                                    {
                                        label:'New Recoveries',
                                        data:dataArr.dailyRecoveries,
                                        backgroundColor:green,
                                        borderColor: lightGreen,
                                        borderWidth: 1,
                                        fill:false
                                    }
                                ]}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{paddingTop:15}} className={'justify-content-center'}>
                <Col sm={12} md={8} offset={2}>
                    <Card text={'info'}>
                        <Card.Header>
                            <h4>Lockdown Levels</h4>
                        </Card.Header>
                        <Card.Body>
                            <LineChart
                                labels={dataArr.date}
                                datasets={[
                                    {
                                        label:'Lockdown Level',
                                        data:dataArr.lockdownLevel,
                                        backgroundColor:red,
                                        borderColor: lightRed,
                                        borderWidth: 1,
                                        fill:false
                                    },
                                    {
                                        label:'Confirmed',
                                        data:dataArr.confirmed,
                                        backgroundColor:blue,
                                        borderColor: lightBlue,
                                        borderWidth: 1,
                                        fill:false
                                    }
                                ]}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
const mapStateToProps=(state)=>{
    return {
        data:state.Entries.data
    }
}
export default connect(mapStateToProps)(Graphs)
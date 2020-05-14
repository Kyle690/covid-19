import React, {useEffect, useReducer} from "react";
import {connect}from 'react-redux';
import {Container, Row, Col, Card, Table} from "react-bootstrap";
import {LineChart} from "../Components/Charts";
import {DataArr, FormatDate} from "../Functions";
import {blue, green, lightBlue, lightGreen, lightRed, lightYellow, red, yellow} from "../Constants";

const Home =({data})=>{

    const initialState={
        firstData:{
            confirmedTotal:0,
            deathsTotal:0,
            activeTotal:0,
            recoveriesTotal:0,
            timestamp:FormatDate(Date.now())
        },
        dataArr:{}
    }
    const [state,dispatch]=useReducer(reducer,initialState)

    const {confirmedTotal,deathsTotal,activeTotal,recoveriesTotal}=state.firstData;
    const {
        days,
        date,
        confirmed,
        difference,
        deaths,
        dailyDeaths,
        recoveries,
        dailyRecoveries,
        active,
        dailyActive,
        lockdownLevel}=state.dataArr;

    useEffect(()=>{
        if(data.length>0){
            const {confirmed,deaths,active,recoveries, timestamp} = data[data.length-1];
            dispatch({type:'firstData',payload:{confirmedTotal:confirmed,deathsTotal:deaths,activeTotal:active,recoveriesTotal:recoveries,date:FormatDate(timestamp)}});
            dispatch({type:'data',payload:DataArr(data)})
        }
    },[data]);



    return (
        <Container fluid>
            <Row>
                <Col sm={3}>
                    <Card text={'info'}>
                        <Card.Header>Confirmed Cases</Card.Header>
                        <Card.Body>
                            <h1>{confirmedTotal}</h1>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3}>
                    <Card text={'danger'}>
                        <Card.Header>Deaths</Card.Header>
                        <Card.Body>
                            <h1>{deathsTotal}</h1>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3}>
                    <Card text={'warning'}>
                        <Card.Header>Recoveries</Card.Header>
                        <Card.Body>
                            <h1>{recoveriesTotal}</h1>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3}>
                    <Card text={'success'}>
                        <Card.Header>Active</Card.Header>
                        <Card.Body>
                            <h1>{activeTotal}</h1>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    {state.dataArr!=={}?
                        <Card>
                            <Card.Body>
                                <LineChart
                                    labels={date}
                                    datasets={[
                                        {
                                            label:'Confirmed',
                                            data:confirmed,
                                            backgroundColor:lightBlue,
                                            borderColor:blue ,
                                            borderWidth: 1,

                                        },
                                        {
                                            label:'Deaths',
                                            data:deaths,
                                            backgroundColor:lightRed,
                                            borderColor:red ,
                                            borderWidth: 1,

                                        },
                                        {
                                            label:'Recoveries',
                                            data:recoveries,
                                            backgroundColor:lightYellow,
                                            borderColor:yellow,
                                            borderWidth: 1,

                                        },
                                        {
                                            label:'Active',
                                            data:active,
                                            backgroundColor:lightGreen,
                                            borderColor:green,
                                            borderWidth: 1,

                                        }
                                    ]}
                                />
                            </Card.Body>
                        </Card>
                        :null
                    }
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    {state.dataArr!=={}?
                        <Card>
                            <Card.Body>
                                <Table striped hover size="sm">
                                    <thead>
                                    <tr>
                                        <th>Day No</th>
                                        <th>Date</th>
                                        <th>Confirmed</th>
                                        <th>Difference</th>
                                        <th>Deaths</th>
                                        <th>Recoveries</th>
                                        <th>Active</th>
                                        <th>Lock Down Level</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {days!==undefined?days.map((day,i)=>(
                                        <tr key={day}>
                                            <td>{day}</td>
                                            <td>{date[i]}</td>
                                            <td>{confirmed[i]}</td>
                                            <td>{difference[i]}</td>
                                            <td>{deaths[i]}</td>
                                            <td>{recoveries[i]}</td>
                                            <td>{active[i]}</td>
                                            <td>{lockdownLevel[i]}</td>
                                        </tr>
                                    )):null}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>:null
                    }


                </Col>
            </Row>
        </Container>
    )
}
const reducer=(state,action)=>{
    switch(action.type){
        case'firstData':
            return {...state,firstData:action.payload}
        case 'data':
            return {...state,dataArr:action.payload}
        default:
            return {...state};
    }
}
const mapStateToProps=state=>{
    return {
        data:state.Entries.data
    }
}
export default connect(mapStateToProps)(Home);
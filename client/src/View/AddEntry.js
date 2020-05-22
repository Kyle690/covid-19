import React,{useReducer} from "react";
import {connect}from 'react-redux';
import {Container, Col, Row, Form, Button, Alert} from "react-bootstrap";
import {addData} from "../Store/Actions/dataActions";
import Loading from "../Components/Loading";

const AddEntry = ({addData})=>{
    const initialState={
        confirm:'',
        deaths:'',
        recover:'',
        date:'',
        level:'',
        loading:false,
        alert:false,
        alertType:'warning',
        alertMsg:'this is just a test'
    }

    const [state,dispatch]=useReducer(reducer,initialState)

    const {confirm,deaths,recover,date,level, loading, alert, alertType, alertMsg}=state;

    const handleSubmit=async()=>{
        let check =false;
        confirm!==''?
            deaths!==''?
                    recover!==''?
                        level!==''?
                            date!==''?
                                    check=true
                                :alert("Please enter a date")
                            :alert('Please enter a lock down level!')
                        :alert('Please enter recoveries number!')
                :alert('Please enter a death number!')
            :alert('Please enter a confirm number!')
        if(check){
              const data ={
                  confirmed:confirm,
                  deaths:deaths,
                  recoveries:recover,
                  ldLevel:level,
                  date:Date.parse(date)
              }
              dispatch({type:'loading'});
            addData(data,res=>{
                dispatch({type:'loading'});
                if(res.status===1){
                    dispatch({type:'alert',payload:{show:true,msg:res.msg,type:'success'}})
                }else{
                    dispatch({type:'alert',payload:{show:true,msg:res.msg,type:'danger'}})
                }
            })

        }else{
            console.log(check)
        }

    }
    const handleChange=(event,name)=>{
        dispatch({type:name,payload:event.target.value});
    }

    return (
        <Container fluid style={{paddingTop:25, margin:10}}>
            <Loading
                show={loading}
            />
            <Alert show={alert} variant={alertType}>
                <Alert.Heading>{alertType==='success'?'Success':'Error'}</Alert.Heading>
                <h5>{alertMsg}</h5>
                <hr/>
                <div className="d-flex justify-content-end">
                    <Button onClick={()=> dispatch({type:'alert',payload:{show:false,msg:'',type:'warning'}})} variant={`outline-${alertType}`}>
                        Close
                    </Button>
                </div>
            </Alert>
            <Row>
                <Col/>
                <Col sm={12} md={6} style={{backgroundColor:'white', padding:15, borderRadius:25}}>
                    <h4 className={'d-flex justify-content-center'}>Manually enter a new data point</h4>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Confirmed
                            </Form.Label>
                            <Form.Control
                                type={'number'}
                                placeholder={'Number of total confirmed cases!'}
                                onChange={event=>handleChange(event,'confirm')}
                                value={confirm}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Deaths</Form.Label>
                            <Form.Control
                                type={'number'}
                                placeholder={'number of deaths'}
                                onChange={event=>handleChange(event,'deaths')}
                                value={deaths}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Recoveries</Form.Label>
                            <Form.Control
                                onChange={event=>handleChange(event,'recover')}
                                value={recover}
                                type={'number'}
                                placeholder={'number of recoveries'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Lock Down Level</Form.Label>
                            <Form.Control
                                onChange={event=>handleChange(event,'level')}
                                value={level}
                                type={'number'} placeholder={'level of lock down'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                onChange={event=>handleChange(event,'date')}
                                value={date}
                                type={'date'} placeholder={'date of entry'}/>
                        </Form.Group>
                        <Button
                            onClick={handleSubmit}
                            type={'button'}
                            block
                            size={'sm'}
                            variant={'success'}>Save</Button>
                    </Form>
                </Col>
                <Col/>
            </Row>
        </Container>
    )
};

const reducer=(state,action)=>{
    switch(action.type){
        case'confirm':
            return {...state,confirm:action.payload}
        case 'deaths':
            return {...state,deaths:action.payload};
        case 'recover':
            return {...state,recover:action.payload};
        case 'date':
            return {...state, date:action.payload};
        case 'level':
            return {...state,level:action.payload};
        case 'loading':
            return {...state,loading:!state.loading}
        case 'alert':
            const {show,msg,type}=action.payload;
            return {...state,alert:show,alertType:type,alertMsg:msg}
        default:
            return {...state}
    }
}

export default connect(null,{addData})(AddEntry);


import React,{useEffect} from "react";
import {Switch, Route ,Redirect}from 'react-router-dom';
import {connect}from 'react-redux';
import {getData} from "../Store/Actions/dataActions";
//components
import NavBar from "../Components/NavBar";
import AddEntry from "./AddEntry";
import History from "./History";
import Graphs from "./Graphs";
import Home from './Home';


const Main = ({getData, data})=>{

    useEffect(()=>{

        getData(res=>{
            console.log(res);
        });
        return;
    },[getData])



    return (
        <>
            <NavBar/>
            <div style={{marginTop:60}}>
                <Switch>
                    <Route path={'/home'} component={Home}/>
                    <Route path={'/add'} component={AddEntry}/>
                    <Route path={'/history'} component={History}/>
                    <Route path={'/graphs'} component={Graphs}/>
                    <Redirect from={'/'} to={'/home'}/>
                </Switch>
            </div>
            <div className={'d-flex justify-content-center'}>
                <p className={'text-muted'}>All data is collected from www.worldometers.info/coronavirus</p>
            </div>

        </>
    )
}
const mapStateToProps=(state)=>{
    return {data:state.Entries.data}
}

export default connect(mapStateToProps,{getData})(Main);
import axios from 'axios';
import {LOAD_ENTRIES} from "../types";

export const addData=(data,callback)=>async dispatch=>{
    const response = await axios.post('/add',data);

    const {status, msg}=response.data;

    status===1?callback({status:1, msg}):callback({status:2,msg});
};

export const getData=(callback)=>async dispatch=>{
    const response = await axios.get('/daily');
    const {status,msg, data}=response.data;

    if(status===1){
        dispatch({type:LOAD_ENTRIES,payload:data});
        callback({status:1});
    }else{
        callback({status:2,msg})
    }
}


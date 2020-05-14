import {LOAD_ENTRIES} from "../types";

const INITIAL_STATE={
    data:[]
};
export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case LOAD_ENTRIES:
            return {...state,data:action.payload};
        default:
            return {...state};
    }
}
import React,{useReducer} from 'react';
import { v4 } from 'uuid';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import {
    SET_ALERT,REMOVE_ALERT
} from '../Types'

const AlertState = (props) => {
    const initalState = [];

    const [state, dispatch] = useReducer(AlertReducer, initalState);
    
    //Set Alert
    const setAlert = (msg, type,timeout =5000) => {
        const id = v4();
        dispatch({ type: SET_ALERT, payload: { msg, type, id } });
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }),timeout);
    }
    return <AlertContext.Provider value={{
        alerts: state,
        setAlert
    }}>
        {props.children}
    </AlertContext.Provider>
}

export default AlertState;
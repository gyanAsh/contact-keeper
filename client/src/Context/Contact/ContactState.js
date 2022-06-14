import React, { useReducer } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';
import ContactReducer from './ContactReducer';
import ContactContext from './ContactContext';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT ,
    SET_CURRENT ,
    CLEAR_CURRENT  ,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../Types';


const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //Get Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('api/v1/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (error) {
            dispatch({type:CONTACT_ERROR, payload:error.response.msg})
        }
    }

    // Add Contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type':"application/json"
            }
        }

        try {
            const res = await axios.post('api/v1/contacts', contact, config);
            // contact.id = v4;
            // dispatch({type:ADD_CONTACT,payload:contact});
            dispatch({type:ADD_CONTACT,payload:res.data})

        } catch (error) {
            dispatch({type:CONTACT_ERROR, payload:error.response.msg})
        }

    }

    // Delete Contact
    const deleteContact = (id) => {
        dispatch({type:DELETE_CONTACT,payload:id})
    }
    // Set Current Contact
    const setCurrent = (contact) => {
        dispatch({type:SET_CURRENT,payload:contact})
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    // Update Contact
    const updateContact = (contact) => {
        dispatch({type:UPDATE_CONTACT,payload:contact})
    }

    // Filter Contact
    const filterContacts = (text)=> {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (<ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            getContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}
        
    >
        {props.children}
    </ContactContext.Provider>)
}

export default ContactState;
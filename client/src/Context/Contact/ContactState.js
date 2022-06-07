import React, { useReducer } from 'react';
import {v4} from 'uuid';
import ContactReducer from './ContactReducer';
import ContactContext from './ContactContext';
import {
    ADD_CONTACT,
    DELETE_CONTACT ,
    SET_CURRENT ,
    CLEAR_CURRENT  ,
    UPDATE_CONTACT,
    FILTER_CONTACTS  ,
    CLEAR_FILTER 
} from '../Types';


const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Ummhani',
                email: 'umm@gmail.com',
                phone: '9445126555',
                type:'personal'
            },
            {
                id: 2,
                name: 'Anupam',
                email: 'anupam@gmail.com',
                phone: '9874563215',
                type:'personal'
            },
        ]
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact
    const addContact = (contact) => {
        contact.id = v4();
        dispatch({type:ADD_CONTACT,payload:contact})
    }

    // Delete Contact
    const deleteContact = (id) => {
        dispatch({type:DELETE_CONTACT,payload:id})
    }
    // Set Current Contact

    // Clear Current Contact

    // Update Contact

    // Filter Contact

    //Clear Filter

    return (<ContactContext.Provider
        value={{
            contacts: state.contacts,
            addContact,
            deleteContact

        }}
        
    >
        {props.children}
    </ContactContext.Provider>)
}

export default ContactState;
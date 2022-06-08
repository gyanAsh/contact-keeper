import React from 'react';
import {
    ADD_CONTACT,
    DELETE_CONTACT ,
    SET_CURRENT ,
    CLEAR_CURRENT  ,
    UPDATE_CONTACT,
    FILTER_CONTACTS  ,
    CLEAR_FILTER 
} from '../Types';

export default ( state, action ) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts:[...state.contacts, action.payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current:null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    if (contact.id == action.payload.id)
                        return action.payload;
                    return contact;
                })
            }
        default:
            return state;
    }

    return
}
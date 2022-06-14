import React,{useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'
import ContactContext from '../../Context/Contact/ContactContext';

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const {clearCurrent,setCurrent,deleteContact} = contactContext;
    const { _id:id, name, email, phone, type } = contact;
    
    const deleteSelectedContact = () => {
        deleteContact(id);
        clearCurrent();
    }
  return (
      <div className="card bg-light ">
          <h3 className="text-primary text-left">
              {name}{' '} <span
                  style={{float : 'right'}}
                  className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                  {type.charAt(0).toUpperCase().concat(type.slice(1))}</span>
          </h3>
          <ul className="list">
              {email && (
                  <li>
                      <FontAwesomeIcon icon={faEnvelope} /> { email}
                  </li>
              )}
              {phone && (
                  <li>
                      <FontAwesomeIcon icon={faPhone} /> { phone}
                  </li>
              )}
          </ul>
          <p>
              <button className="btn btn-dark btn-sm"onClick={()=> setCurrent(contact)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={deleteSelectedContact}>Delete</button>
          </p>
    </div>
  )
}

ContactItem.propTypes = {
    contact : PropTypes.object.isRequired,
}

export default ContactItem
import React, { useContext, useRef,useEffect } from 'react';
import ContactContext from '../../Context/Contact/ContactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');

    const { filterContacts, filtered, clearFilter } = contactContext;

    // useEffect(() => {
    //     if (filtered === null)
    //         text.current.value = '';
    // })

    const onChange = (e) => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }

  return (
      <from>
          <input ref={text} type="text"
              placeholder="Filter Contacts...."
              onChange={onChange}/>
    </from>
  )
}

export default ContactFilter;
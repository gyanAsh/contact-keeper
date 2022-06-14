import React, { Fragment, useContext } from 'react';
import {CSSTransition,TransitionGroup } from 'react-transition-group'
import ContactContext from '../../Context/Contact/ContactContext'
import ContactItem from './ContactItem';
const Contacts = () => {
    const contactContext = useContext(ContactContext);
  const { contacts,filtered } = contactContext;
  
  if (contacts.length === 0) {
    return <h4>Please Add Context...</h4>
  }

  return (
    <Fragment>
      <TransitionGroup className="todo-list">
      {filtered != null ? filtered.map(contact => (
        <CSSTransition
          key={contact._id}
          timeout={500}
          classNames="item"
        >
       <ContactItem  contact={contact}/>
        </CSSTransition>)): contacts.map(contact => (
          <CSSTransition
            key={contact._id}
            timeout={500}
          classNames="item"
          >
       <ContactItem  contact={contact}/>
       </CSSTransition>))}
      </TransitionGroup>
    </Fragment>
  )
}

export default Contacts
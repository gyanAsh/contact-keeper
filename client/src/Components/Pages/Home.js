import React, { useContext, useEffect } from 'react'
import Contacts from '../Contacts/Contacts'
import ContactForm from '../Contacts/ContactForm' 
import ContactFilter from '../Contacts/ContactFilter';
import AuthContext from '../../Context/Auth/AuthContext';
const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  },[])
  return (
    <div className="grid-2">
      <div>
        <ContactForm/>
      </div>
      <div>
        <ContactFilter/>
        <Contacts/>
      </div>
    </div>
  )
}

export default Home
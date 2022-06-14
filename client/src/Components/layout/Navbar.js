import React,{Fragment,useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAddressBook,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/Auth/AuthContext';
import ContactContext from '../../Context/Contact/ContactContext';
const Navbar = ({ title }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user } = authContext;
    const {clearContacts} = contactContext;
    const onLogout = () => {
        clearContacts();
        logout();
    }
    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <li>
                  <Link to='/about'> About</Link>
              </li>
              <li>
                  <Link to='/register'>Register</Link>
              </li>
              <li>
                  <Link to='/login'> Login</Link>
              </li>
        </Fragment>
    );
  return (
      <div className = "navbar bg-primary">
          <h1>
          <FontAwesomeIcon icon={faAddressBook} /> {title}
          </h1>
          <ul>
              {isAuthenticated ? authLinks : guestLinks}
          </ul>
    </div>
  )
}


Navbar.propTypes = {
    title: PropTypes.string.isRequired,
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: ""
}

export default Navbar;
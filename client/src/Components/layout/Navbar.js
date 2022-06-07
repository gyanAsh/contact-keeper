import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAddressBook} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const Navbar = ({title,icon}) => {
  return (
      <div className = "navbar bg-primary">
          <h1>
          <FontAwesomeIcon icon={faAddressBook} /> {title}
          </h1>
          <ul>
              <li>
                  <Link to='/'> Home</Link>
              </li>
              <li>
                  <Link to='/about'> About</Link>
              </li>
          </ul>
    </div>
  )
}


Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: ""
}

export default Navbar;
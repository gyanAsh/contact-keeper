import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAddressBook} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Navbar = ({title,icon}) => {
  return (
      <div className = "navbar bg-primary">
          <h1>
          <FontAwesomeIcon icon={faAddressBook} /> {title}
          </h1>
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
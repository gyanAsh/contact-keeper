import React, { useContext } from 'react';
import AlertContext from '../../Context/Alert/AlertContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';

const Alerts = () => {
    const alertContext = useContext(AlertContext);
  return(alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
              <div key={alert.id} className={`alert alert-${alert.type}`}>
                  <FontAwesomeIcon icon={faInfoCircle}/> {alert.msg}
              </div>
  ))
  )
  
}

export default Alerts
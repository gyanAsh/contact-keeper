import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '../../Context/Auth/AuthContext';

const PrivateRoute = ({children}) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;
    if(!isAuthenticated && !loading)
        return <Navigate replace to='/login' />
    
    return children
}
export default PrivateRoute;
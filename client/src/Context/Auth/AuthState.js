import {useReducer}  from  'react'
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../Utils/setAuthToken';
import axios from 'axios';
import { 
    
    REGISTER_FAIL ,
    USER_LOADED ,
    AUTH_ERROR ,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    REGISTER_SUCCESS 
} from '../Types'

const AuthState = (props) => {

    const initalState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user:null,
        error: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initalState);

    //Load User
    const loadUser = async() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/v1/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (error) {
            setTimeout(() => dispatch({ type: AUTH_ERROR }),5000)
            
        }
    }

    //Register UserSchema
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/v1/users', formData, config);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        } catch (error) {
            dispatch({type:REGISTER_FAIL, payload: error.response.data.msg})
        }
    }

    //Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/v1/auth', formData, config);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        } catch (error) {
            dispatch({type:LOGIN_FAIL, payload: error.response.data.msg})
        }
    }

    //Logout
    const logout = () => {
        console.log('oooggg')
        dispatch({ type:LOGOUT})
    }

    //Clear Error
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
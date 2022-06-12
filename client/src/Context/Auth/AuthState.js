import {useReducer}  from  'react'
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
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
    const loadUser = () => {
        console.log("Load User");
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
            console.log(error);
            dispatch({type:REGISTER_FAIL, payload: error.response.data.msg})
        }
    }

    //Login User
    const login = () => {
        console.log("Login");
    }

    //Logout
    const logout = () => {
        console.log("logout User");
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
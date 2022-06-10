import {useReducer}  from  'react'
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
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

    //Register UserSchema

    //Login User

    //Logout

    //Clear Error

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
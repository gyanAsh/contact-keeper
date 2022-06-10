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

const AuthReducer = (state,action) => {
    switch (action.type) {
        case "Aup":
            return {
                ...state,
                user:null
            }
    }
    
}

export default AuthReducer;
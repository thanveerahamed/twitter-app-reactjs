import { ReduxActions } from "../configurations/app-contants";

function GetTokenSuccess(token){    
    return{
        type: ReduxActions.GET_TOKEN_SUCCESS,
        token: token
    }
}

export default GetTokenSuccess;
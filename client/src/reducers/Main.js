import { ReduxActions } from "../configurations/app-contants";

const initialState = {
    token: null
}

function Main(state = initialState, action) {
    switch (action.type) {
        case ReduxActions.GET_TOKEN_SUCCESS:
            const loggedin = Object.assign({}, state, {
                token: action.token
            })
            return loggedin;

        default:
            return state;
    }
}

export default Main;
const GET_USER = 'user/GET_USER'
import { normalizeObj } from "./helpers"

export const getUser = (user) => ({
    type: GET_USER,
    payload: user
})

export const ThunkAddUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`)

    if (res.ok){
        const user = await res.json()
        dispatch(getUser(user))
        return user;
    } else {
        const data = await res.json();
        if(data.errors){
            return data;
        }
    }
}

const initialState = {}

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER:
            newState = {...state};
            newState.users = normalizeObj(action.users)
            return newState;
        default:
            return state;
    }
}

export default userReducer;


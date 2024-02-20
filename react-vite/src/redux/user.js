import { normalizeObj } from "./helpers";

const GET_USER = 'user/GET_USER';

export const getUser = (user) => ({
    type: GET_USER,
    payload: user
})

export const thunkAddUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);

    if (res.ok){
        const user = await res.json();
        dispatch(getUser(user));
        return user;
    } 
    const data = await res.json();
    if(data.errors) return data;
}

const initialState = {}

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER:
            newState = {...state};
            newState.users = normalizeObj(action.payload);
            return newState;
        default:
            return state;
    }
}

export default userReducer;
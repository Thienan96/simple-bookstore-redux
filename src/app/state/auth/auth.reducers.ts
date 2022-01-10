import { Action, createReducer, on } from "@ngrx/store";
import { AuthState } from "../app.state";
import { login, loginFailed, loginSucess, logout, logoutSucess } from "./auth.actions";

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

const reducer = createReducer(
    initialState,
    on(login, (state) => state),
    on(loginSucess, (state, {payload}) => ({...state, isAuthenticated: true, user: payload})),
    on(loginFailed, (state, {payload}) => ({...state, isAuthenticated: false, user: null, errorMessage: payload})),
    on(logout, (state) => state),
    on(logoutSucess, (state) => ({...state, isAuthenticated: false, user: null})),
    on(loginFailed, (state, {payload}) => ({...state, errorMessage: payload}))
);

export function AuthReducer(state = initialState, action: Action) {
    return reducer(state, action);
}

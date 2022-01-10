import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[LOGIN] Login'
);

export const loginSucess = createAction(
    '[LOGIN_SUCCESS] Login Success',
    props<{ payload: any }>()
);

export const loginFailed = createAction(
    '[LOGIN_FAILED] Login Failed',
    props<{ payload: string }>()
);

export const logout = createAction(
    '[LOGOUT] Logout'
);

export const logoutSucess = createAction(
    '[LOGOUT_SUCCESS] Logout Success',
);

export const logoutFailed = createAction(
    '[LOGOUT_FAILED] logout Failed',
    props<{ payload: string }>()
);
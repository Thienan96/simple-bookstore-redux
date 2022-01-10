import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../app.state";

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuth = createSelector(
    getAuthState,
    (state: AuthState) => state.user
);

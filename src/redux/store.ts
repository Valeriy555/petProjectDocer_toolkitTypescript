import {configureStore} from "@reduxjs/toolkit";
import {inspectorReducer, stageReducer} from "./slices";

const store = configureStore({
    reducer: {
        inspectorReducer,
        stageReducer
    }
});

type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof  store.dispatch;

export type {
    RootState,
    AppDispatch
}

export {
    store
}
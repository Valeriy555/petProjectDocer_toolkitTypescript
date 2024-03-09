import {configureStore} from "@reduxjs/toolkit";
import {containerReducer, inspectorReducer, stageReducer} from "./slices";

const store = configureStore({
    reducer: {
        inspectorReducer,
        stageReducer,
        containerReducer
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
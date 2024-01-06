import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IInspector} from "../../interfaces";
import {inspectorService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    inspectors: IInspector[],
    inspectorForUpdate: IInspector | null,
    loading: false,
    error: {
        status: number;
        message: string;
    } | null;
}

const initialState: IState = {
    inspectors: [],
    inspectorForUpdate: null,
    error: null,
    loading: false
};


const getAllInspector = createAsyncThunk<IInspector[], void>(
    'inspectorSlice/getAllInspector',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await inspectorService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const createInspector = createAsyncThunk<IInspector, { inspector: IInspector }>(
    'inspectorSlice/createInspector',
    async ({inspector}, {rejectWithValue}) => {
        try {
            const {data} = await inspectorService.create(inspector);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const updateInspector = createAsyncThunk<void, { _id: number, inspector: IInspector }>(
    'inspectorSlice/updateInspector',
    async ({_id, inspector}, {rejectWithValue, dispatch}) => {
        try {
            await inspectorService.updateById(_id, inspector)
            await dispatch(getAllInspector())
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);


const deleteInspector = createAsyncThunk<void, { _id: number }>(
    'inspectorSlice/deleteInspector',
    async ({ _id }, { rejectWithValue, dispatch }) => {
        try {
            await inspectorService.deleteById(_id);
            await dispatch(getAllInspector());
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const inspectorSlice = createSlice({
    name: 'inspectorSlice',
    initialState,
    reducers: {
        setInspectorForUpdate: (state, action:PayloadAction<{inspector:IInspector|null}>)=>{
            state.inspectorForUpdate = action.payload.inspector
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAllInspector.fulfilled, (state, action) => {
                state.inspectors = action.payload
            })
            .addCase(createInspector.fulfilled, (state, action) => {
                state.inspectors.push(action.payload)
            })
            .addDefaultCase((state, action) => {
                const [pathElement] = action.type.split('/').splice(-1);
                if (pathElement === 'rejected') {
                    state.error = action.payload;
                    state.loading = false;
                }

            })
});

const {reducer: inspectorReducer, actions} = inspectorSlice;

const inspectorActions = {
    ...actions,
    getAllInspector,
    createInspector,
    updateInspector,
    deleteInspector
};

export {
    inspectorActions,
    inspectorReducer

}
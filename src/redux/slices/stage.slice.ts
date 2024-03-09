import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IStage} from "../../interfaces";
import {stageService} from "../../services";
import {AxiosError} from "axios";


interface IState {
    stages: IStage[],
    stageForUpdate: IStage | null,
    loading: false,
    error: {
        status: number;
        message: string;
    } | null;
}

const initialState: IState = {
    stages: [],
    stageForUpdate: null,
    error: null,
    loading: false
};

const getAllStage = createAsyncThunk<IStage[], void>(
    'stageSlice/getAllStage',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await stageService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data)
        }
    }
);

const createStage = createAsyncThunk<IStage, { stage: IStage }>(
    'stageSlice/createStage',
    async ({stage}, {rejectWithValue}) => {
        try {
            const {data} = await stageService.create(stage);
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data)
        }
    }
);

const updateStage = createAsyncThunk<void, { _id: number, stage: IStage }>(
    'stageSlice/updateStage',
    async ({_id, stage}, {rejectWithValue, dispatch}) => {
        try {
            await stageService.updateById(_id, stage)
            await dispatch(getAllStage())
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data)
        }
    }
);

const deleteStage = createAsyncThunk<void, { _id: number, stage: IStage }>(
    'stageSlice/updateStage',
    async ({_id}, {rejectWithValue, dispatch}) => {
        try {
            await stageService.deleteById(_id);
            await dispatch(getAllStage());
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const stageSlice = createSlice({
    name: 'stageSlice',
    initialState,
    reducers: {
        setStageForUpdate: (state, action: PayloadAction<{ stage: IStage | null }>) => {
            state.stageForUpdate = action.payload.stage
        }
    },

    extraReducers: builder =>
        builder
            .addCase(getAllStage.fulfilled, (state, action) => {
                state.stages = action.payload
            })
            .addCase(createStage.fulfilled, (state, action) => {
                state.stages.push(action.payload)
            })
            .addDefaultCase((state, action) => {
                const [pathElement] = action.type.split('/').splice(-1);
                if (pathElement === 'rejected') {
                    state.error = (action as PayloadAction<any>).payload;
                    state.loading = false;
                }
            })
});


const {reducer: stageReducer, actions} = stageSlice;

const stageActions = {
    ...actions,
    getAllStage,
    createStage,
    updateStage,
    deleteStage,

};

export {
    stageActions,
    stageReducer
}
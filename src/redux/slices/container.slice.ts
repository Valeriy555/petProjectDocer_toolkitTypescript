import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {AxiosError} from "axios";
import {IContainer} from "../../interfaces";
import {containerService} from "../../services/container.service";

interface IState {
    containers: IContainer[],
    containerForUpdate: IContainer | null,
    loading: false,
    error: {
        status: number;
        message: string;
    } | null;
}

const initialState: IState = {
    containers: [],
    containerForUpdate: null,
    error: null,
    loading: false
};


const getAllContainer = createAsyncThunk<IContainer[], void>(
    'containerSlice/getAllContainer',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await containerService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const createContainer = createAsyncThunk<IContainer, { container: IContainer }>(
    'containerSlice/createContainer',
    async ({container}, {rejectWithValue}) => {
        try {
            const {data} = await containerService.create(container);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const updateContainer = createAsyncThunk<void, { _id: number, container: IContainer }>(
    'containerSlice/updateContainer',
    async ({_id, container}, {rejectWithValue, dispatch}) => {
        try {
            await containerService.updateById(_id, container)
            await dispatch(getAllContainer())
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);


const deleteContainer = createAsyncThunk<void, { _id: number }>(
    'containerSlice/deleteContainer',
    async ({_id}, {rejectWithValue, dispatch}) => {
        try {
            await containerService.deleteById(_id);
            await dispatch(getAllContainer());
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const containerSlice = createSlice({
    name: 'containerSlice',
    initialState,
    reducers: {
        setContainerForUpdate: (state, action: PayloadAction<{ cont: IContainer | null }>) => {
            state.containerForUpdate = action.payload.cont
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAllContainer.fulfilled, (state, action) => {
                state.containers = action.payload
            })
            .addCase(createContainer.fulfilled, (state, action) => {
                state.containers.push(action.payload)
            })
            .addDefaultCase((state, action) => {
                const [pathElement] = action.type.split('/').splice(-1);
                if (pathElement === 'rejected') {
                    state.error = (action as PayloadAction<any>).payload;
                    state.loading = false;
                }

            })
});

const {reducer: containerReducer, actions} = containerSlice;

const containerActions = {
    ...actions,
    getAllContainer,
    createContainer,
    updateContainer,
    deleteContainer
};

export {
    containerActions,
    containerReducer

}
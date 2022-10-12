import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const { search, category, pageCount, sortType } = params;
        const { data } = await axios.get(`https://62dba18de56f6d82a774e889.mockapi.io/items?page=${pageCount}&limit=4&${category}${search}&sortBy=${sortType.sortType}&order=${sortType.order}`);

        return data;
    }
)

const initialState = {
    items: [],
    status: 'loading',
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setData(state, action) {
            console.log('все ок');
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizza.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizza.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizza.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        },
    },
})

export const { setData } = pizzaSlice.actions;
export default pizzaSlice.reducer;
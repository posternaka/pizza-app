import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// type FetchPizzasArgs = Record<string, string>;

type SortType = {
    sortType: string;
    order: string;
}

type FetchPizzasArgs = {
    search: string;
    category: string;
    pageCount: number;
    sortType: SortType
}

export const fetchPizza = createAsyncThunk<Pizzas[], FetchPizzasArgs>( 
    'pizza/fetchPizzaStatus',
    async (params) => {
        const { search, category, pageCount, sortType } = params;
        const { data } = await axios.get<Pizzas[]>(`https://62dba18de56f6d82a774e889.mockapi.io/items?page=${pageCount}&limit=4&${category}${search}&sortBy=${sortType.sortType}&order=${sortType.order}`);

        return data;
    }
)

//Либо так
// export const fetchPizza = createAsyncThunk(
//     'pizza/fetchPizzaStatus',
//     async (params: FetchPizzasArgs) => {
//         const { search, category, pageCount, sortType } = params;
//         const { data } = await axios.get(`https://62dba18de56f6d82a774e889.mockapi.io/items?page=${pageCount}&limit=4&${category}${search}&sortBy=${sortType.sortType}&order=${sortType.order}`);

//         return data as TCartSlice[];
//     }
// )

type Pizzas = {
    id: string;
    title: string; 
    types: number[]; 
    sizes: number[];
    price: number;
    imageUrl: string;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface IPizzaSlice {
    items: Pizzas[];
    status: Status ;
}

const initialState: IPizzaSlice = {
    items: [],
    status: Status.LOADING,
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<Pizzas[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizza.pending, (state) => {
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizza.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizza.rejected, (state) => {
                state.status = Status.ERROR;
                state.items = [];
            })
    },
    // extraReducers: {
    //     [fetchPizza.pending]: (state) => {
    //         state.status = 'loading';
    //         state.items = [];
    //     },
    //     [fetchPizza.fulfilled]: (state, action) => {
    //         state.items = action.payload;
    //         state.status = 'success';
    //     },
    //     [fetchPizza.rejected]: (state) => {
    //         state.status = 'error';
    //         state.items = [];
    //     },
    // },
})

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setData } = pizzaSlice.actions;
export default pizzaSlice.reducer;
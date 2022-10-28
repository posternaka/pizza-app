import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizza } from './asyncAction';
import { IPizzaSlice, Pizzas, Status } from './types';


//Либо так
// export const fetchPizza = createAsyncThunk(
//     'pizza/fetchPizzaStatus',
//     async (params: FetchPizzasArgs) => {
//         const { search, category, pageCount, sortType } = params;
//         const { data } = await axios.get(`https://62dba18de56f6d82a774e889.mockapi.io/items?page=${pageCount}&limit=4&${category}${search}&sortBy=${sortType.sortType}&order=${sortType.order}`);

//         return data as TCartSlice[];
//     }
// )



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

export const { setData } = pizzaSlice.actions;
export default pizzaSlice.reducer;
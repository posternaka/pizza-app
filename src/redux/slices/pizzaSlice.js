import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setData(state, action) {
            state.items = action.payload;
        },
    }
})

export const { setData } = pizzaSlice.actions;
export default pizzaSlice.reducer;
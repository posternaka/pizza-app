import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalPrice: 0,
    items: [],
}

const cache = (items, obj) => {
    const res = items.find(item => item.newID === obj.newID);
    const newItems = [...items.filter(item => item.newID !== obj.newID)];
    if(!res) {
        newItems.push(obj);
    } else {
        res.count++;
        newItems.push(res);
    }
    return newItems;
}

const cardSlices = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addItem(state, action) {
            // state.items.push(action.payload);
            state.items = cache(state.items, action.payload);
        },

    }
})

export const { addItem } = cardSlices.actions;
export default cardSlices.reducer;
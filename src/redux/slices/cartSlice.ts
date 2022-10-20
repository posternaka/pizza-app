import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TCartSlice = {
    id: string; 
    title: string;
    type: string; 
    size: number; 
    price: number;
    count: number;
    imageUrl: string;
}

interface ICartSlice {
    totalPrice: number;
    items: TCartSlice[];
}

const initialState: ICartSlice = {
    totalPrice: 0,
    items: [],
}


const cartSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<TCartSlice>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if(findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);

            if(findItem) {
                findItem.count--;
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items.filter(obj => obj.id !== action.payload);
            console.log(state.items.filter(obj => obj.id !== action.payload));
            
        },
        clearItem(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
})

export const selectCart = (state: RootState) => state.cart;
export const selectCartById = (id: string) => (state: RootState) => state.cart.items.find(it => it.id === id)

export const { addItem, minusItem, removeItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;
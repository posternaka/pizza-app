import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getPizzasFromLS } from '../../utils/getPizzasFromLS';
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

const { items, totalPrice } = getPizzasFromLS();

const initialState: ICartSlice = {
    totalPrice: totalPrice,
    items: items,
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

            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);

            if(findItem) {
                findItem.count--;
            }

            state.totalPrice = calcTotalPrice(state.items);
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
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TSort = {
    name: 'популярности ↑' | 'популярности ↓' | 'цене ↑' | 'цене ↓' | 'алфавиту ↑' | 'алфавиту ↓';
    sortType: 'rating' | 'price' | 'name';
    order: 'asc' | 'desc';
}

interface IFilterSlice {
    searchValue: string;
    categoryId: number;
    pageCount: number;
    sortType: TSort;
}

const initialState: IFilterSlice = {
    searchValue: '',
    categoryId: 0,
    pageCount: 1,
    sortType: {
        name: 'популярности ↑', 
        sortType: 'rating', 
        order: 'asc'
    }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSortType(state, action: PayloadAction<TSort>) {
            state.sortType = action.payload;
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload;
        }
    }
})

export const selectSort = (state: RootState) => state.filter;
export const { setCategoryId, setSortType, setPageCount, setSearch } = filterSlice.actions;
export default filterSlice.reducer;
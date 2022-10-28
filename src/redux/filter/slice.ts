import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterSlice, TSort } from './types';

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

export const { setCategoryId, setSortType, setPageCount, setSearch } = filterSlice.actions;
export default filterSlice.reducer;
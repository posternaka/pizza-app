import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
        setSearch(state, action) {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortType(state, action) {
            state.sortType = action.payload;
        },
        setPageCount(state, action) {
            state.pageCount = action.payload;
        }
    }
})

export const selectSort = (state) => state.filter;
export const { setCategoryId, setSortType, setPageCount, setSearch } = filterSlice.actions;
export default filterSlice.reducer;
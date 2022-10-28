export type TSort = {
    name: 'популярности ↑' | 'популярности ↓' | 'цене ↑' | 'цене ↓' | 'алфавиту ↑' | 'алфавиту ↓';
    sortType: 'rating' | 'price' | 'name';
    order: 'asc' | 'desc';
}

export interface IFilterSlice {
    searchValue: string;
    categoryId: number;
    pageCount: number;
    sortType: TSort;
}
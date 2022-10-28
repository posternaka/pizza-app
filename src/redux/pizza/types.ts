// type FetchPizzasArgs = Record<string, string>;

export type SortType = {
    sortType: string;
    order: string;
}

export type FetchPizzasArgs = {
    search: string;
    category: string;
    pageCount: number;
    sortType: SortType
}


export type Pizzas = {
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

export interface IPizzaSlice {
    items: Pizzas[];
    status: Status ;
}
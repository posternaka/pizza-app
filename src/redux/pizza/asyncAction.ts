import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchPizzasArgs, Pizzas } from "./types";

export const fetchPizza = createAsyncThunk<Pizzas[], FetchPizzasArgs>( 
    'pizza/fetchPizzaStatus',
    async (params) => {
        const { search, category, pageCount, sortType } = params;
        const { data } = await axios.get<Pizzas[]>(`https://62dba18de56f6d82a774e889.mockapi.io/items?page=${pageCount}&limit=4&${category}${search}&sortBy=${sortType.sortType}&order=${sortType.order}`);

        return data;
    }
)

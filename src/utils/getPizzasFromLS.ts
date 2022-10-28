import { TCartSlice } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getPizzasFromLS = () => {
    const data = localStorage.getItem('pizzas');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    return {
        items: items as TCartSlice[],
        totalPrice,
    }
}
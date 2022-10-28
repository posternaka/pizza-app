import { TCartSlice } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: TCartSlice[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
}
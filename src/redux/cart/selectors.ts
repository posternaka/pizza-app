import { RootState } from "../store";

export const selectCart = (state: RootState) => state.cart;
export const selectCartById = (id: string) => (state: RootState) => state.cart.items.find(it => it.id === id)
 
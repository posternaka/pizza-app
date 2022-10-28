export type TCartSlice = {
    id: string; 
    title: string;
    type: string; 
    size: number; 
    price: number;
    count: number;
    imageUrl: string;
}

export interface ICartSlice {
    totalPrice: number;
    items: TCartSlice[];
}
// src/store/formSlice.ts
import { IProduct } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderLineItem {
  id: string;
  name: string;
  price: number;
  productThumbnail: string;
}

interface OrderLineItems {
  products: OrderLineItem[];
}

// Safely retrieve cart items from localStorage
const getInitialOrderLineItems = (): OrderLineItem[] => {
  try {
    const storedItems = localStorage.getItem("posItems");
    if (storedItems) {
      return JSON.parse(storedItems);
    }
  } catch (error) {
    console.error("Failed to parse pos items from localStorage", error);
  }
  return [];
};

const initialState: OrderLineItems = {
  products: getInitialOrderLineItems(),
};

const pointOfSale = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProductToOrderLine: (state, action: PayloadAction<OrderLineItem>) => {
      state.products.push(action.payload);
    },
    removeProductFromOrderLine: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },
  },
});

export const { addProductToOrderLine, removeProductFromOrderLine } =
  pointOfSale.actions;
export default pointOfSale.reducer;

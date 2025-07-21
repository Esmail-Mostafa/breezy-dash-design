import { TableData } from "@/components/dashboard/DataTable";
import { toast } from "./use-toast";

type Action =
  | { type: "ADDToCart"; payload: TableData }
  | { type: "AddToFavorites"; payload: TableData }
  | { type: "RemoveFromCart"; id: string }
  | { type: "RemoveFromFavorites"; id: string };

// Initialize local storage data
let ADDToCartLocalStoge: TableData[] = [];
let AddToFavoritestLocalStoge: TableData[] = [];

// Load from localStorage only on the client side
if (typeof window !== "undefined") {
  ADDToCartLocalStoge = localStorage.getItem("ADDToCart")
    ? JSON.parse(localStorage.getItem("ADDToCart")!)
    : [];
  AddToFavoritestLocalStoge = localStorage.getItem("AddToFavorites")
    ? JSON.parse(localStorage.getItem("AddToFavorites")!)
    : [];
}

export const tableReducer = (
  state: TableData[],
  action: Action
): TableData[] => {
  const showToast = (
    title: string,
    description: string,
    variant: "default" | "destructive" = "default"
  ) => {
    if (typeof window !== "undefined") {
      toast({
        title,
        description,
        variant,
      });
    }
  };
  switch (action.type) {
    case "ADDToCart":
      showToast("Item added to cart", "Item has been added to your cart");
      return [...state, action.payload];

    case "AddToFavorites":
      showToast(
        "Item already in Favorites",
        "This item is already in your favorites",
        "destructive"
      );
      return state;

    case "RemoveFromCart":
      showToast("RemoveFromCart", "RemoveFromCart", "destructive");
      return state;
    case "RemoveFromFavorites":
      showToast("RemoveFromFavorites", "RemoveFromFavorites", "destructive");
    default:
      return state;
  }
};

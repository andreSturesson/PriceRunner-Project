import { atom, useAtom } from "jotai";

export const wishlistAtom = atom([]);

export const useWishlistAtom = () => {
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  return [wishlist, setWishlist];
};

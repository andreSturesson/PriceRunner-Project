import { atom } from "jotai";

let user = localStorage.getItem("user");
export let isLoggedInAtom;

if (user) {
  try {
    user = JSON.parse(user);
    isLoggedInAtom = atom(true);
  } catch (error) {
    localStorage.removeItem("user");
    isLoggedInAtom = atom(false);
  }
} else {
  user = {};
  isLoggedInAtom = atom(false);
}

export const userAtom = atom(user, (_get, set, newUser) => {
  set(userAtom, newUser);
});

import { atom } from "recoil";

export const chainIdState = atom(
    {
        key: "chainIdTag",
        default: 0
    }
);

export const usdtBtnIsLoadingState = atom(
    {
        key: "usdtBtnIsLoadingTag",
        default: false
    }
);

export const usdcBtnIsLoadingState = atom(
    {
        key: "usdcBtnIsLoadingTag",
        default: false
    }
);
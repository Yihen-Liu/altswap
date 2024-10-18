import React from "react";
import {SignupButton} from "./signup";
import {IBaseProps} from "../../interfaces/props";

const Buttons:React.FC<IBaseProps> = (props:IBaseProps) => {

    return(
        <>
            { <SignupButton />}
        </>
    );
}

export {Buttons};
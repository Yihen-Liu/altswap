import React from "react";
import {SignupArea} from "./signup";
import {IBaseProps} from "../../interfaces/props";

const InputAreas:React.FC<IBaseProps> = (props:IBaseProps) => {
    return(
        <div>
            { <SignupArea />}
        </div>
    );
}

export {InputAreas} ;
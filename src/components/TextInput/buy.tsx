import React, {useMemo, useState} from "react";
import {Box, } from "@chakra-ui/layout";
import {TextInput} from "./textinput";
import {IBaseProps} from "../../interfaces/props";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../reducers/state";
import {signupPasswordAction, signupSpacenameAction} from "../../reducers/action";

const BuyArea:React.FC<IBaseProps> = (props:IBaseProps)=>{
	const dispatch = useDispatch();

	const isConnection = useSelector((state:StateType)=>state.walletConnection);
	const [spaceValue, setSpaceValue] = useState<string>("")
	const [pwdValue, setPwdValue] = useState<string>("")
	const handleSpaceChange = (event: React.FormEvent<HTMLInputElement>)=>setSpaceValue(event.currentTarget.value)
	const handlePwdChange = (event: React.FormEvent<HTMLInputElement>)=>setPwdValue(event.currentTarget.value)

	const [spaceNameHolder, ]	= useState<string>("sBTC Received Address ...")
	const [passwordHolder, ] = useState<string>("sBTC Amount To Buy ...")
	useMemo(()=>{
		dispatch(signupSpacenameAction(isConnection, spaceValue));
	},[dispatch, isConnection, spaceValue])

	useMemo(()=>{
		dispatch(signupPasswordAction(isConnection, pwdValue));
	},[dispatch,isConnection, pwdValue])

    return(
            <>
            <Box
                w="100%"
                bg="whiteAlpha"
                p={4}
                borderRadius={8}
                boxShadow="lg"
            >
                    <TextInput
	                    placeholder={spaceNameHolder}
	                    type={'text'}
	                    disabled={!isConnection}
	                    value={spaceValue}
	                    onChange={handleSpaceChange}
                    />
            </Box>
            <Box
                w="100%"
                bg="whiteAlpha"
                p={4}
                borderRadius={8}
                boxShadow="lg"
            >
                <TextInput
                    type={'password'}
                    placeholder={passwordHolder}
                    disabled={!isConnection}
                    value={pwdValue}
                    onChange={handlePwdChange}
                />
            </Box>
        </>
    );
}

export {BuyArea};
import {  HStack, Box,Container } from "@chakra-ui/layout";
import {Seedlist} from "./seedlist";
import React from "react";
import WalletInfo from "../Wallet/wallet";
import {IBaseProps} from "../../interfaces/props";

const Header:React.FC<IBaseProps> = (props:IBaseProps)=>{
    return(
        <Container maxW="container.xl">
            <HStack py={5} wrap="wrap" spacing={0}>
                <Seedlist />
                <Box flexGrow={1}> </Box>
                <WalletInfo />
            </HStack>
        </Container>
    );
}
export {Header};
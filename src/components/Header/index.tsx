import {  HStack, Container } from "@chakra-ui/layout";
import {Seedlist} from "./seedlist";
/*import { useWeb3 } from "../../helpers/web3"; */
import React from "react";
import {PageRouter} from "./routers";
import WalletInfo from "../Wallet/wallet";
import {IBaseProps} from "../../interfaces/props";

const Header:React.FC<IBaseProps> = (props:IBaseProps)=>{
    return(
        <Container maxW="container.xl">
            <HStack py={5} wrap="wrap" spacing={0}>
                <Seedlist />
                <PageRouter />
                <WalletInfo />
            </HStack>
        </Container>
    );
}
export {Header};
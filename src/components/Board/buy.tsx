import React from "react";
import {Box, Center, HStack, Stack} from "@chakra-ui/layout";
import {Buttons} from "../Buttons/buttons";
import {IBaseProps} from "../../interfaces/props";
import { BuyArea } from "../TextInput/buy";

const BuyBoard:React.FC<IBaseProps>=(props:IBaseProps)=>{
    return(
        <Center>
            <Stack marginY="20px" width={650}>
                <Box bgColor="#2b2d32" p="5" w="100%"  maxW="lg" borderRadius="8" >
                    <Stack spacing={6} width={470}>
                        <BuyArea />
                        <HStack spacing="24px" width="100%">
                            <Buttons />
                        </HStack>
                    </Stack>
                </Box>
            </Stack>
        </Center>
    );
}

export {BuyBoard};
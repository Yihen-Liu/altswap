import {HStack, Text} from "@chakra-ui/layout";
import React  from "react";
import {IBaseProps} from "../../interfaces/props";
import {Menu, MenuButton, IconButton} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {Trans} from "@lingui/macro";

const Seedlist:React.FC<IBaseProps>=(props:IBaseProps) => {
    return(
			<HStack spacing={2}>
				<Text fontWeight="extrabold" fontSize="4xl">
					AltSwap
				</Text>

				<Menu matchWidth={true} autoSelect={false} >
					<MenuButton maxH="30px" as={IconButton} rightIcon={<ChevronDownIcon />}
					            variant='outline' colorScheme={"blackAlpha.100"}
					            bg={"#1a1d22"} borderRadius='md'
					            borderWidth='0px' _hover={{ bg: '#2b2d32' }}
					            _expanded={{ bg: '#2b2d32' }} _focus={{ boxShadow: 'outline', bg:"#2b2d32" }}
					>
						<Text fontSize="15px">
						<Trans>version</Trans>: v1.0
						</Text>
					</MenuButton>
				</Menu>
			</HStack>
    );
}

export {Seedlist};
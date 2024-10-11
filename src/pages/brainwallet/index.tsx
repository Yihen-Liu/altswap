import React from "react";
import {Center, Container, Text} from "@chakra-ui/layout";
import { IBaseProps } from "../../interfaces/props";
import {WalletBoard} from "../../components/Board/brainwallet";

const Brainwallet:React.FC<IBaseProps> = (props:IBaseProps)=>{
	return(
		<Center>
			<Container>
				<Center>
					<Text fontSize="1xl" fontWeight="extrabold">
						Search Tranaction With Your Buy Address
					</Text>
				</Center>
				<WalletBoard />
			</Container>
		</Center>
	);
}

export {Brainwallet};

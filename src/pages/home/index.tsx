import React from "react";
import { Center, Container, Text } from "@chakra-ui/layout";
import { IBaseProps } from "../../interfaces/props";
import { BuyBoard } from "../../components/Board/buy";

const Home: React.FC<IBaseProps> = (props: IBaseProps) => {
  return (
    <Center>
      <Container>
        <Center>
          <Text fontSize="2xl" >
            welcome to use sBTC for your Bitcoin develop
          </Text>
        </Center>
        {<BuyBoard />}
      </Container>
    </Center>
  );
};

export { Home };

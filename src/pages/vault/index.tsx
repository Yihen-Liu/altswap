import React from "react";
import { Center, Container, Text } from "@chakra-ui/layout";
import { IBaseProps } from "../../interfaces/props";
import { SignBoard } from "../../components/Board/signup";

const Vault: React.FC<IBaseProps> = (props: IBaseProps) => {
  return (
    <Center>
      <Container>
        <Center>
          <Text fontSize="2xl" >
            welcome to use sBTC for your Bitcoin develop
          </Text>
        </Center>
        {<SignBoard />}
      </Container>
    </Center>
  );
};

export { Vault };

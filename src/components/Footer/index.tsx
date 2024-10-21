import { Text, HStack, Container } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import { Link } from "@chakra-ui/react";
import React from "react";
import { IBaseProps } from "../../interfaces/props";
import { Trans } from "@lingui/macro";
import { NavLink } from "react-router-dom";

const Footer: React.FC<IBaseProps> = (props: IBaseProps) => {
  return (
    <FooterContainer maxW="container.xl" centerContent>
      <HStack py={5} wrap="wrap" spacing={6}>
        <Link href="/">
          <HStack spacing={2}>
            <Text fontSize="1xl" fontWeight="">
              <Trans>Forum</Trans>
            </Text>
          </HStack>
        </Link>

        <Link href="/">
          <HStack spacing={2}>
            <Text fontSize="1xl" fontWeight="">
              Discord
            </Text>
          </HStack>
        </Link>

        <NavLink to="/">
          <HStack spacing={2}>
            <Text fontSize="1xl" fontWeight="">
              <Trans>Donate Me </Trans>
            </Text>
          </HStack>
        </NavLink>
      </HStack>
    </FooterContainer>
  );
};

const FooterContainer = styled(Container)`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export { Footer };

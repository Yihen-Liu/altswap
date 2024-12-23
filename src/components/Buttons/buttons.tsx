import React, { useCallback, useMemo } from "react";
import { Button } from "@chakra-ui/button";
import { Trans } from "@lingui/macro";
import { IBaseProps } from "../../interfaces/props";
import { useSelector } from "react-redux";
import { StateType } from "../../reducers/state";
import { WarningIcon } from "@chakra-ui/icons";
import { useSuccessToast, useWarningToast } from "../../hooks/useToast";
import { etherClient } from "../../ethers/etherClient";
import { useRecoilState } from "recoil";
import {
  chainIdState,
  usdtBtnIsLoadingState,
  usdcBtnIsLoadingState,
} from "../../hooks/Atoms";

const Buttons: React.FC<IBaseProps> = (props: IBaseProps) => {
  const isConnection = useSelector(
    (state: StateType) => state.walletConnection
  );

  const successToast = useSuccessToast();
  const warningToast = useWarningToast();
  const receiver = useSelector((state: StateType) => state.spaceNameValue);
  const amount = useSelector((state: StateType) => state.passwordValue);
  const [chainId] = useRecoilState(chainIdState);
  const [usdtIsLoading, setUSDTIsLoading] = useRecoilState(
    usdtBtnIsLoadingState
  );

  const [usdcIsLoading, setUSDCIsLoading] = useRecoilState(
    usdcBtnIsLoadingState
  );
  const BuyWithUSDT = useCallback(async () => {
      console.log("USDT receiver:", receiver);
      console.log("USDT amount:", amount);
    setUSDTIsLoading(true);
    if (
      receiver === undefined ||
      amount === undefined ||
      receiver === "" ||
      amount ===""
    ) {
      warningToast("address or amount is empty");

      setUSDTIsLoading(false);
      return;
    }

    if (receiver.length < 32 ) {
      warningToast("content length must more than 8 chars");

      setUSDTIsLoading(false);
      return;
    }

    etherClient.connectOrderBookContract();
    await etherClient.connectSigner();
    if (!etherClient.client) {
      warningToast("Wallet Maybe ERROR");

      setUSDTIsLoading(false);
      return;
    }

    let _res = await etherClient.client?.createSaveOrder(
      receiver,
      Number(amount),
      "USDT"
    );
    if (_res === true) {
      successToast("Init Vault Spacename Success");
    } else {
      warningToast("Init Vault Spacename Fail");
    }
    setUSDTIsLoading(false);
  }, [receiver, amount, chainId]);

  const BuyWithUSDC = useCallback(async () => {
      console.log("USDC receiver:", receiver);
      console.log("USDC amount:", amount);
    setUSDCIsLoading(true);
    if (
      receiver === undefined ||
      amount === undefined ||
      receiver === "" ||
      amount ==="" 
    ) {
      warningToast("address or amount is empty");

      setUSDCIsLoading(false);
      return;
    }

    if (receiver.length < 8) {
      warningToast("content length must more than 8 chars");

      setUSDCIsLoading(false);
      return;
    }

    etherClient.connectOrderBookContract();
    etherClient.connectSigner();
    if (!etherClient.client) {
      warningToast("Wallet Maybe ERROR");

      setUSDCIsLoading(false);
      return;
    }

    let _res = await etherClient.client?.createSaveOrder(
      receiver,
      Number(amount),
      "USDC"
    );
    if (_res === true) {
      successToast("Init Vault Spacename Success");
    } else {
      warningToast("Init Vault Spacename Fail");
    }
    setUSDCIsLoading(false);
  }, [receiver, amount, chainId]);

  const activeButton = useMemo(() => {
    return (
      <>
        <Button
          colorScheme="blackAlpha"
          fontSize="xl"
          onClick={BuyWithUSDC}
          isLoading={usdcIsLoading}
          w="100%"
        >
          <Trans>Buy with USDC</Trans>
        </Button>

        <Button
          colorScheme="blackAlpha"
          fontSize="xl"
          onClick={BuyWithUSDT}
          isLoading={usdtIsLoading}
          w="100%"
        >
          <Trans>Buy with USDT</Trans>
        </Button>
      </>
    );
  }, [BuyWithUSDC, BuyWithUSDT, usdcIsLoading, usdtIsLoading]);

  const inactiveButton = useMemo(() => {
    return (
      <Button width="100%" colorScheme="blackAlpha" disabled={true} size="lg">
        <WarningIcon w={5} h={5} color="red.500" />{" "}
        <Trans> Please connect wallet firstly </Trans>
      </Button>
    );
  }, []);

  return (
    <>
      {isConnection === true && activeButton}
      {isConnection !== true && inactiveButton}
    </>
  );
};

export { Buttons };

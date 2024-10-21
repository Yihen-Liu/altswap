import React, { useCallback, useMemo } from "react";
import { Button } from "@chakra-ui/button";
import { Trans } from "@lingui/macro";
import { IBaseProps } from "../../interfaces/props";
import { useSelector } from "react-redux";
import { StateType } from "../../reducers/state";
import { WarningIcon } from "@chakra-ui/icons";
import { CryptoMachine2022 } from "../../lib/crypto";
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
  const spaceName = useSelector((state: StateType) => state.spaceNameValue);
  const password = useSelector((state: StateType) => state.passwordValue);
  const [chainId] = useRecoilState(chainIdState);
  const [usdtIsLoading, setUSDTIsLoading] = useRecoilState(
    usdtBtnIsLoadingState
  );

  const [usdcIsLoading, setUSDCIsLoading] = useRecoilState(
    usdcBtnIsLoadingState
  );
  const BuyWithUSDT = useCallback(async () => {
    setUSDTIsLoading(true);
    if (
      spaceName === undefined ||
      password === undefined ||
      spaceName === "" ||
      password === ""
    ) {
        warningToast("address or amount is empty");

      setUSDTIsLoading(false);
      return;
    }

    if (spaceName.length < 8 || password.length < 8) {
        warningToast("content length must more than 8 chars");

      setUSDTIsLoading(false);
      return;
    }

    etherClient.connectSeedlistContract();
    etherClient.connectSigner();
    if (!etherClient.client) {
        warningToast("Wallet Maybe ERROR");

      setUSDTIsLoading(false);
      return;
    }

    //let _params = await encryptor.calculateVaultHasRegisterParams();
    let _res = await etherClient.client?.createSaveOrder(0, "sBTC receiver", 1, "USDT");
    if (_res === true) {
        successToast("Init Vault Spacename Success");
    } else {
        warningToast("Init Vault Spacename Fail");
    }
    setUSDTIsLoading(false);
  }, [spaceName, password, chainId]);

  const BuyWithUSDC = useCallback(async () => {
    setUSDCIsLoading(true);
    if (
      spaceName === undefined ||
      password === undefined ||
      spaceName === "" ||
      password === ""
    ) {
        warningToast("address or amount is empty");

      setUSDCIsLoading(false);
      return;
    }

    if (spaceName.length < 8 || password.length < 8) {
        warningToast("content length must more than 8 chars");

      setUSDCIsLoading(false);
      return;
    }

    let encryptor = new CryptoMachine2022(spaceName, password, chainId);
    etherClient.connectSeedlistContract();
    etherClient.connectSigner();
    if (!etherClient.client) {
        warningToast("Wallet Maybe ERROR");

      setUSDCIsLoading(false);
      return;
    }
    await encryptor.generateWallet(spaceName, password);
    let params = await encryptor.calculateVaultHasRegisterParams();
    let res = await etherClient.client?.vaultHasRegister(
      params.address,
      params.deadline,
      params.signature.r,
      params.signature.s,
      params.signature.v
    );
    if (res === true) {
      warningToast("Same information has been registed.");
      setUSDCIsLoading(false);
      return;
    }

    let vaultParams = await encryptor.calculateInitVaultHubParams();
    try {
      let res0 = await etherClient.client?.initPrivateVault(
        vaultParams.address,
        vaultParams.signature.r,
        vaultParams.signature.s,
        vaultParams.signature.v,
        vaultParams.deadline
      );
    } catch (e) {
      setUSDCIsLoading(false);
      return;
    }
    let _params = await encryptor.calculateVaultHasRegisterParams();
    let _res = await etherClient.client?.vaultHasRegister(
      _params.address,
      _params.deadline,
      _params.signature.r,
      _params.signature.s,
      _params.signature.v
    );
    if (_res === true) {
        successToast("Init Vault Spacename Success");
    } else {
        warningToast("Init Vault Spacename Fail");
    }
    setUSDCIsLoading(false);
  }, [spaceName, password, chainId]);

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

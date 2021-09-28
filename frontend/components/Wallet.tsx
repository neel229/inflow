import React, { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../utils/connector";
import { useEagerConnect, useInactiveListener } from "../utils/hook";

const Wallet = () => {
  const {
    connector,
    // library,
    // chainId,
    // account,
    activate,
    // deactivate,
    active,
    error,
  } = useWeb3React<Web3Provider>();

  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  // const activating = injectedConnector  === activatingConnector;
  const connected = injectedConnector === connector;
  const disabled = !triedEager || !!activatingConnector || connected || !!error

  return (
    <div>
      {active ? (
        <div>Account Connected</div>
      ) : (
        <div>
          <button
            className="py-2 px-3 border-black border-2 rounded-md font-bold hover:shadow-lg"
            disabled={disabled}
            onClick={() => {
                setActivatingConnector(injectedConnector)
                activate(injectedConnector)
              }}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default Wallet;

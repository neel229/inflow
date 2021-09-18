import React from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../utils/connector";

const Wallet = () => {
  const { activate, active } = useWeb3React<Web3Provider>();
  const handleConnect = () => {
    activate(injectedConnector);
  };

  return (
    <div>
      {active ? (
        <div>Account Connected</div>
      ) : (
        <div>
          <button
            className="py-2 px-3 border-black border-2 rounded-md font-bold hover:shadow-lg"
            onClick={handleConnect}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default Wallet;

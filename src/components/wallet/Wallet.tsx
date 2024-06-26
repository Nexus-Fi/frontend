import { ClipboardCopyText } from "@interchain-ui/react";
import { WalletStatus } from "cosmos-kit";
import { useChain } from "@cosmos-kit/react";
import { CHAIN_NAME, getChainLogo } from "@/lib/utils";
import { Chain } from "./Chain";
import { Warning } from "./Warning";
import {
  ButtonConnect,
  ButtonConnected,
  ButtonConnecting,
  ButtonDisconnected,
  ButtonError,
  ButtonNotExist,
  ButtonRejected,
} from "./Connect";

export function Wallet() {
  const { chain, status, wallet, address, message, connect, openView } =
    useChain(CHAIN_NAME);

  const ConnectButton = {
    [WalletStatus.Connected]: <ButtonConnected onClick={openView} />,
    [WalletStatus.Connecting]: <ButtonConnecting />,
    [WalletStatus.Disconnected]: <ButtonDisconnected onClick={connect} />,
    [WalletStatus.Error]: <ButtonError onClick={openView} />,
    [WalletStatus.Rejected]: <ButtonRejected onClick={connect} />,
    [WalletStatus.NotExist]: <ButtonNotExist onClick={openView} />,
  }[status] || <ButtonConnect onClick={connect} />;

  return (
    <div className="flex flex-row focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center border-1 border-black text-black bg-gradient-to-r  from-pink-300 via-purple-300 to-indigo-400 hover:bg-blue-700 focus:ring-blue-800">
      {/* <Chain logo={getChainLogo(chain.chain_name)!} /> */}

      {/* {address ? <ClipboardCopyText text={address} truncate="middle" /> : null} */}

      {ConnectButton}

      {message &&
        [WalletStatus.Error, WalletStatus.Rejected].includes(status) ? (
        <Warning text={`${wallet?.prettyName}: ${message}`} />
      ) : null}
    </div>
  );
}

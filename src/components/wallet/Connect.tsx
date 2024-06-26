import { MouseEventHandler } from "react";
import { Button as UIButton, IconName } from "@interchain-ui/react";

export type ButtonProps = {
  text?: string;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type ConnectProps = Pick<ButtonProps, "text" | "loading" | "onClick">;

function noop() { }

export function Button({
  text,
  icon,
  loading,
  disabled,
  onClick = noop,
}: ButtonProps) {
  return (
    <UIButton
      onClick={onClick}
      leftIcon={icon}
      disabled={disabled}
      isLoading={loading}
      domAttributes={{
        style: {
          background:
            "linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))"
        },
      }}
    >
      <div className="mx-4 my-1  border-1 border-black"> {text}</div>
    </UIButton>
  );
}

export const ButtonConnect = ({
  text = "Connect",
  onClick = noop,
}: ConnectProps) => (
  <Button text={text} icon="walletFilled" onClick={onClick} />
);

export const ButtonConnected = ({
  text = "Connected",
  onClick = noop,
}: ConnectProps) => (
  <Button text={text} icon="walletFilled" onClick={onClick} />
);

export const ButtonDisconnected = ({
  text = "Connect Wallet",
  onClick = noop,
}: ConnectProps) => (
  <Button text={text} icon="walletFilled" onClick={onClick} />
);

export const ButtonConnecting = ({
  text = "Connecting ...",
  loading = true,
}: ConnectProps) => <Button text={text} loading={loading} />;

export const ButtonRejected = ({
  text = "Reconnect",
  onClick = noop,
}: ConnectProps) => (
  <Button text={text} icon="walletFilled" onClick={onClick} />
);

export const ButtonError = ({
  text = "Change Wallet",
  onClick = noop,
}: ConnectProps) => (
  <Button text={text} icon="walletFilled" onClick={onClick} />
);

export const ButtonNotExist = ({
  text = "Install Wallet",
  onClick = noop,
}: ConnectProps) => (
  <Button text={text} icon="walletFilled" onClick={onClick} />
);

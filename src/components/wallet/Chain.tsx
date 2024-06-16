import Image from "next/image";
import { Box, Stack, useColorModeValue } from "@interchain-ui/react";

export type ChainProps = {
  logo?: string;
};

export const DefaultChainLogo =
  "https://dummyimage.com/150/9e9e9e/ffffff&text=☒";

export function Chain({ logo = DefaultChainLogo }: ChainProps) {
  return (
    <Image
      alt={`Chain logo`}
      src={logo}
      width="38"
      height="38"
      style={{ borderRadius: "100%" }}
    />
  );
}

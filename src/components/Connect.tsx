"use client";

import * as React from "react";
import { useChainId, useConnect } from "wagmi";
import { ConnectorButton } from "./ConnectorButton";

export function Connect() {
  const chainId = useChainId();
  const { connectors, connect } = useConnect();

  return (
    <div className="gap-2 flex">
      {connectors.map((connector) => (
        <ConnectorButton
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector, chainId })}
        />
      ))}
    </div>
  );
}

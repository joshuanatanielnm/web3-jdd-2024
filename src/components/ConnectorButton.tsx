import { useEffect, useState } from "react";
import { Connector } from "wagmi";

export function ConnectorButton({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    };
    init();
  }, [connector, setReady]);

  return (
    <button disabled={!ready} onClick={onClick} type="button">
      {connector.name}
    </button>
  );
}

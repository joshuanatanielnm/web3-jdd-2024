import { useEffect, useState } from "react";
import { Connector } from "wagmi";

export function ConnectorButton({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    const init = async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    };
    init();
  }, [connector]);

  if (!mounted) {
    return null;
  }

  return (
    <button disabled={!ready} onClick={onClick} type="button">
      {connector.name}
    </button>
  );
}

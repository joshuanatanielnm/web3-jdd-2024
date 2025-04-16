import abi from "@/constants/abi";
import { useReadContract } from "wagmi";
import { CampaignDetail } from "./CampaignDetail";
import { contract } from "@/constants/contract";
import { useEffect, useState } from "react";

export const Campaigns = () => {
  const [mounted, setMounted] = useState(false);
  const [arrayData, setArrayData] = useState<number[]>([]);

  const { data: campaignCount } = useReadContract({
    address: contract,
    abi: abi,
    functionName: "campaignCount",
  });

  useEffect(() => {
    setMounted(true);
    if (campaignCount) {
      setArrayData(
        Array.from({ length: Number(campaignCount) }, (_, i) => i + 1)
      );
    }
  }, [campaignCount]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="mt-4 ">
      <h2 className="font-bold text-xl mt-8 mb-4">Campaigns</h2>
      <p>There are {campaignCount?.toString() || "0"} campaigns</p>
      <div className="flex flex-wrap gap-4 justify-between mt-2">
        {arrayData.map((id) => (
          <CampaignDetail key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

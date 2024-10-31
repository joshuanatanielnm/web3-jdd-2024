import abi from "@/constants/abi";
import { useReadContract } from "wagmi";
import { CampaignDetail } from "./CampaignDetail";

export const Campaigns = () => {
  const numberToArray = (num: number) => {
    return Array.from({ length: num }, (_, i) => i + 1);
  };
  const { data: campaignCount } = useReadContract({
    address: "0xC13B4C26bAE6042253a5ac11d43c642Bf8dDC4c6",
    abi: abi,
    functionName: "campaignCount",
  });

  const arrayData = campaignCount ? numberToArray(Number(campaignCount)) : [];
  console.log(arrayData, "arrayData");

  return (
    <div className="mt-4 ">
      <h2 className="font-bold text-xl mt-8 mb-4">Campaigns</h2>
      <p>There are {campaignCount} campaigns</p>
      <div className="flex flex-wrap gap-4 justify-between mt-2">
        {arrayData.map((id) => (
          <CampaignDetail key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

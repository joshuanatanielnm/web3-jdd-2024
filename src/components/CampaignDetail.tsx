import abi from "@/constants/abi";
import Image from "next/image";
import { useReadContract } from "wagmi";
import { FundModal } from "./FundModal";
import { formatEther } from "viem";

interface CampaignDetailProps {
  id: number;
}

export const CampaignDetail = ({ id }: CampaignDetailProps) => {
  const { data, isLoading, isError } = useReadContract({
    address: "0xC13B4C26bAE6042253a5ac11d43c642Bf8dDC4c6",
    abi: abi,
    functionName: "campaigns",
    args: [BigInt(id)],
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error fetching data.</p>;

  if (!data) return <p>No data found.</p>;

  const campaignDetails = {
    fundraiser: data[0],
    title: data[1],
    description: data[2],
    image: data[3],
    targetAmount: data[4].toString(),
    totalFunded: formatEther(data[5]),
    totalWithdrawn: data[6].toString(),
    status: data[7].toString(), // Convert enum value as needed
  };

  const progress =
    (Number(campaignDetails.totalFunded) /
      Number(campaignDetails.targetAmount)) *
    100;
  const isProgressFull = progress > 100;

  const renderProgressBar = () => {
    return (
      <div
        className="ring-offset-background focus-visible:ring-ring rounded-full border bg-blue-400 shadow-tabs transition-all"
        style={{
          width: `${isProgressFull ? 100 : progress}%`,
          height: "100%",
        }}
      />
    );
  };

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div className="bg-blue-900 w-[49%] p-4 rounded-xl">
      <Image
        src="https://placehold.co/600x400"
        alt="Placeholder"
        width={600}
        height={400}
        className="rounded-xl"
      />
      <div className="mt-4">
        <h3 className="font-bold text-xl">
          {capitalize(campaignDetails.title)}
        </h3>
        <p className="text-gray-300">{campaignDetails.description}</p>
      </div>
      <div className="mt-3">
        <div className="h-3 bg-gray-700 rounded-xl overflow-hidden">
          {renderProgressBar()}
        </div>
        <div className="flex justify-between mt-1 text-sm">
          <p className="text-gray-300">Fund Raised</p>
          <p>
            {campaignDetails.totalFunded}/{campaignDetails.targetAmount}
          </p>
        </div>
      </div>
      <FundModal campaignId={id} />
    </div>
  );
};

import abi from "@/constants/abi";
import Image from "next/image";
import { useReadContract } from "wagmi";
import { FundModal } from "./FundModal";
import { formatEther } from "viem";
import { useEffect, useState } from "react";
import { contract } from "@/constants/contract";

interface CampaignDetailProps {
  id: number;
}

interface CampaignDetails {
  fundraiser: string;
  title: string;
  description: string;
  image: string;
  targetAmount: string;
  totalFunded: string;
  totalWithdrawn: string;
  status: string;
}

export const CampaignDetail = ({ id }: CampaignDetailProps) => {
  const [mounted, setMounted] = useState(false);
  const [campaignDetails, setCampaignDetails] =
    useState<CampaignDetails | null>(null);

  const { data, isLoading, isError } = useReadContract({
    address: contract,
    abi: abi,
    functionName: "campaigns",
    args: [BigInt(id)],
  });

  useEffect(() => {
    setMounted(true);
    if (data) {
      setCampaignDetails({
        fundraiser: data[0],
        title: data[1],
        description: data[2],
        image: data[3],
        targetAmount: data[4].toString(),
        totalFunded: formatEther(data[5]),
        totalWithdrawn: data[6].toString(),
        status: data[7].toString(),
      });
    }
  }, [data]);

  if (!mounted) {
    return null;
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data.</p>;
  if (!campaignDetails) return <p>No data found.</p>;

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

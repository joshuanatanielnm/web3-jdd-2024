import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import abi from "@/constants/abi";
import { parseEther } from "viem";

interface FundModalProps {
  campaignId: number;
}

export const FundModal = ({ campaignId }: FundModalProps) => {
  const [fundAmount, setFundAmount] = useState(0);
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      writeContract({
        address: "0xC13B4C26bAE6042253a5ac11d43c642Bf8dDC4c6",
        abi: abi,
        functionName: "fundCampaign",
        args: [BigInt(campaignId)],
        value: parseEther(fundAmount.toString()),
      });
      console.log("Campaign funded");
    } catch (error) {
      console.error("Error funded campaign:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full mt-4">Fund</DialogTrigger>
      <DialogContent className="bg-blue-950">
        <DialogHeader>
          <DialogTitle>Fund Modal</DialogTitle>
          <DialogDescription>
            Enter the amount you would like to fund for this campaign
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Fund Amount"
            className="input w-full"
            id="fundAmount"
            value={fundAmount}
            onChange={(event) => setFundAmount(Number(event.target.value))}
          />
          <button
            className={`button mt-4 ${isConfirming && "opacity-5"} w-full`}
            type="submit"
            disabled={isConfirming}
          >
            Create Campaign
          </button>
        </form>

        {isConfirming && <p>Waiting for confirmation...</p>}
        {isConfirmed && <p>Transaction confirmed.</p>}
      </DialogContent>
    </Dialog>
  );
};

import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { FormEvent, useEffect, useState } from "react";
import abi from "@/constants/abi";
import { contract } from "@/constants/contract";

export function CreateCampaign() {
  const { data: hash, writeContract } = useWriteContract();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const resetState = () => {
    setTitle("");
    setDescription("");
    setTargetAmount(0);
  };
  const image = "https://placehold.co/600x400";

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      resetState();
    }
  }, [isConfirmed]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      writeContract({
        address: contract,
        abi: abi,
        functionName: "createCampaign",
        args: [title, description, image, BigInt(targetAmount)],
      });
      console.log("Campaign created");
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div className="container mx-auto mt-12">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="inline">
          <input
            type="text"
            placeholder="Title"
            className="input"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="input"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <input
            type="number"
            placeholder="Target Amount"
            className="input"
            id="targetAmount"
            value={targetAmount}
            onChange={(event) => setTargetAmount(Number(event.target.value))}
          />
        </div>
        <button
          className={`button mt-4 ${isConfirming && "opacity-5"}`}
          type="submit"
          disabled={isConfirming}
        >
          Create Campaign
        </button>
      </form>
      {isConfirming && <p>Waiting for confirmation...</p>}
      {isConfirmed && <p>Transaction confirmed.</p>}
    </div>
  );
}

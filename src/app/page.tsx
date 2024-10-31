"use client";

import { Account } from "@/components/Account";
import { Campaigns } from "@/components/Campaigns";
import { Connect } from "@/components/Connect";
import { CreateCampaign } from "@/components/CreateCampaign";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      <main className=" bg-gray-700">
        <div className="max-w-4xl mx-auto py-10 px-4 bg-blue-950 min-h-screen">
          {isConnected ? <Account /> : <Connect />}
          {isConnected && <CreateCampaign />}
          {isConnected && <Campaigns />}
        </div>
      </main>
    </>
  );
}

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TitleInfo() {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image
            src="/dashboard/dashboard/wallet-check.svg"
            width="44"
            height="44"
          ></Image>
          <h2 className="text-[24px] ml-4">Alice Uniqueness verification</h2>
        </div>
        <button
          onClick={() => {
            window.location.replace("https://alice-v2.muon.net/dashboard");
          }}
          className="flex items-center transition duration-150 ease-in-out hover:bg-primary-20 rounded-[10px] px-4"
        >
          <Image
            src="/dashboard/verification/back-icon.svg"
            width="24"
            height="24"
          ></Image>
          <span className="text-primary underline ">Back to dashboard</span>
        </button>
      </div>
      <p className="text-lg mt-4">
        Welcome to Alice&apos;s Uniqueness Verification Center! Here, you can
        complete the verification process to access and operate the three
        different tiers of nodes. Please note that you should complete only ONE
        of these methods to be granted the ability to run each node tier.
      </p>
    </div>
  );
}

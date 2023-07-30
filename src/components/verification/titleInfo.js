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
            src="/dashboard/wallet-check.svg"
            width="44"
            height="44"
          ></Image>
          <h2>Alice Uniqueness verification</h2>
        </div>
        <button
          onClick={() => router.push("/")}
          className="flex items-center transition duration-150 ease-in-out hover:bg-primary/10 rounded-[10px] px-4"
        >
          <Image
            src="/verification/back-icon.svg"
            width="24"
            height="24"
          ></Image>
          Back to dashboard
        </button>
      </div>
      <p>
        Welcome to Alice's Uniqueness Verification Center! Here, you can
        complete our verification processes to access and operate our 3-tier
        levels of nodes. Please note that each verification method corresponds
        to a specific node tier, granting you the ability to run nodes within
        that tier.
      </p>
      <p>
        Want a seamless verification process? Our <a>guidance document</a> has
        you covered.
      </p>
    </div>
  );
}

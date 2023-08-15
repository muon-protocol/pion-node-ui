"use client";
import { Loading } from "@/components/layout/Loading";
import { ERRORCODE } from "@/utils/errorCodeMessage";
import { discordRequest } from "@/utils/requestVerifications";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/app/style.module.css";
import Image from "next/image";
import { WarningBox } from "../verification/page";

export default function DiscordVerification() {
  const searchParams = useSearchParams();
  const staker = searchParams.get("state");
  const code = searchParams.get("code");

  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    discordRequest(code, staker)
      .then((res) => {
        if (res.data.success) {
          setStep(1);
        } else {
          setErrorMessage(ERRORCODE[res.data.errorCode]("Discord"));
          setStep(2);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(ERRORCODE["connection"]());
        setStep(2);
      });
  }, []);

  if (!step) {
    return <Loading></Loading>;
  } else {
    return (
      <div className="flex flex-wrap justify-center">
        <div>
          <div className="mx-auto mt-14 relative w-full ">
            <Image
              className=""
              src={`/dashboard/verification/Discord.svg`}
              width="90"
              height="81"
            ></Image>
            {step === 1 && (
              <Image
                className={`absolute ${styles.discord}`}
                src={`/dashboard/verification/Success.svg`}
                width="20"
                height="50"
              ></Image>
            )}
            {step === 2 && (
              <Image
                className={`absolute ${styles.discord}`}
                src={`/dashboard/verification/Rejected.svg`}
                width="20"
                height="50"
              ></Image>
            )}
          </div>
        </div>

        {step === 1 ? (
          <p className="text-lg text-center">
            Congratulations! <br />
            You passed Discord active community member verification Your access
            granted to run Alice Starter node
          </p>
        ) : (
          <>
            <p className="text-lg text-center my-8">{errorMessage}</p>
            <WarningBox>Requirement: a few messages before 27th Feb</WarningBox>
          </>
        )}
      </div>
    );
  }
}

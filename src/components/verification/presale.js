import Image from "next/image";
import styles from "@/app/verification/presale/style.module.css";

export default function Presale() {
  const status = true;
  return (
    <div className="w-[570px] rounded-[18px] bg-white min-h-[524px] px-8 py-4">
      <h2>Muon Presale Participation</h2>
      <div className="mx-auto mt-14 relative w-fit ">
        <Image
          className=""
          src={`/verification/wallet.svg`}
          width="90"
          height="81"
        ></Image>
        {status ? (
          <Image
            className={`absolute ${styles.child_image}`}
            src={`/verification/Rejected.svg`}
            width="20"
            height="50"
          ></Image>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

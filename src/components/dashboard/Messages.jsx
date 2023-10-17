import Image from "next/image";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import styles from "@/app/style.module.css";
import { useState } from "react";

function WarningBox({ children, className, dangerouslySetInnerHTML }) {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <div
        className={`${className} flex rounded-lg items-center bg-cardBackground/50 px-4 py-2`}
      >
        <div className="min-w-[30px]">
          <Image
            width="30"
            height="20"
            src="/pion/dashboard/verification/warrning-icon.svg"
          ></Image>
        </div>
        <p
          className={` text-sm ml-3`}
          dangerouslySetInnerHTML={{ __html: dangerouslySetInnerHTML }}
        >
          {children}
        </p>
        <button
          onClick={() => {
            setShow(false);
          }}
          className={styles.close_btn}
        >
          <Image
            width="30"
            height="20"
            src="/pion/dashboard/dashboard/Close-button.svg"
          ></Image>
        </button>
      </div>
    );
  } else {
    return <></>;
  }
}

const Parent = styled.div`
  position: absolute;
  bottom: 20px;
  right: 10px;
  z-index: 999;
  max-width: 40vw;
  max-height: 90vh;
  overflow-y: auto;
`;

export default function Messages() {
  const messages = useSelector(
    (state) => state.rootReducer.nodeReducer.messages
  );

  return (
    <Parent>
      {messages.map((message, index) => (
        <WarningBox
          key={index}
          className={"my-2"}
          dangerouslySetInnerHTML={message.message}
        ></WarningBox>
      ))}
    </Parent>
  );
}

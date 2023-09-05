import Lottie from "lottie-react";
import loadingAnimation from "@/jsons/lottie/animation_llrn0ng9.json";

export default function PrimaryBtn({ onClick, loading, children, disable }) {
  const style = {
    height: 45,
    width: 45,
  };
  if (loading) {
    return (
      <button
        onClick={onClick}
        disabled
        className="px-8 bg-myPrimary text-white text-xl font-semibold rounded-xl  mt-2"
      >
        <Lottie style={style} animationData={loadingAnimation}></Lottie>
      </button>
    );
  }

  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={`${
        disable && "opacity-50"
      } px-8 bg-myPrimary text-white text-xl font-semibold rounded-xl py-2 mt-2`}
    >
      {children}
    </button>
  );
}

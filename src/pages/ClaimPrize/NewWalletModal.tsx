const NewWalletModal = () => {
  return (
    <div className="pb-4 px-3 flex flex-col justify-center items-center">
      <img
        className="w-[108px] mb-10"
        src="/assets/images/claim/add-wallet-icon-colored.svg"
        alt=""
      />
      <p className="text-black">
        1. Open your wallet
        <br />
        2. Switch to your other eligible address
      </p>
    </div>
  );
};

export default NewWalletModal;

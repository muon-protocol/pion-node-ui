const NewWalletModal = () => {
  return (
    <div className="pb-4 px-3 flex flex-col justify-center items-center">
      <img
        className="w-[108px] mb-10"
        src="/assets/images/claim/add-wallet-icon-colored.svg"
        alt=""
      />
      <p className="text-center text-black">
        You can easily switch to your new wallet using metamask or other wallet
        providers to claim your node-drop together.
      </p>
    </div>
  );
};

export default NewWalletModal;

import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';

const Migration = () => {
  return (
    <div className="w-full page__bg">
      <div className="page flex flex-col !pt-48 items-center gap-6">
        <Hero />
        <Title />
        <Body />
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="flex gap-14">
      <img src="/assets/images/migration/pion-icon.svg" alt="" />
      <img src="/assets/images/migration/arrow-icon.svg" alt="" />
      <img src="/assets/images/migration/pion-v2-icon.svg" alt="" />
    </section>
  );
};

const Title = () => {
  return (
    <section className="text-4xl flex gap-2">
      <p className="font-tomorrow font-bold">$PION</p>
      <p className="font-semibold">Token Migration</p>
    </section>
  );
};

const Body = () => {
  const { walletAddress } = useUserProfile();

  return (
    <section className="flex flex-col gap-12 items-center">
      {!walletAddress ? <ConnectWalletBody /> : <ClaimTokenBody />}
    </section>
  );
};

const ConnectWalletBody = () => {
  return (
    <>
      <p className="text-center text-xl font-medium max-w-[517px]">
        [Explainer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna ]
      </p>
      <button className="btn btn--white btn--with-icon">
        <img
          className="h-8 w-auto"
          src="/assets/images/migration/wallet-icon.svg"
          alt=""
        />
        <p className="text-inherit">Connect Wallet</p>
      </button>
    </>
  );
};

const ClaimTokenBody = () => {
  return (
    <>
      <p className="text-center text-xl font-medium max-w-[517px]">
        [Explainer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna ]
      </p>
      <div className="card bg-primary-L1-50 rounded-[18px] pt-7 pl-11 pr-10 pb-8 max-w-[517px]">
        <p className="text-white mb-10 text-lg font-medium">
          You had <strong>4,000 PION</strong> tokens in your wallet at snapshot
          taken on October 23, 2023, at 14:55:42 (Ethereum Mainnet Block
          #1234567)
        </p>
        <button className="btn btn--white btn--medium-with-icon mx-auto">
          <img
            className="h-6 w-6"
            src="/assets/images/migration/claim-icon.svg"
            alt=""
          />
          <p className="text-inherit">Claim PION</p>
        </button>
      </div>
    </>
  );
};
export default Migration;

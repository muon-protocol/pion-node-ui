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
  if (Math.random() > 0.5) {
    return <ClaimTokenWalletWithBalance />;
  }
  return <ClaimTokenWalletWithoutBalance />;
};

const ClaimTokenWalletWithBalance = () => {
  return (
    <>
      <p className="text-center text-xl font-medium max-w-[517px]">
        [Explainer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna ]
      </p>
      <div className="card bg-primary-L1-50 rounded-[18px] flex flex-col justify-between min-h-[290px] pt-7 pl-14 pr-10 pb-8 w-[517px]">
        <ul className="list-disc">
          {Math.random() > 0.5 && (
            <li className="text-white mb-3 text-lg font-medium">
              You had <strong>4,000 PION</strong> tokens in your wallet at
              snapshot taken on October 23, 2023, at 14:55:42 (Ethereum Mainnet
              Block #1234567).
            </li>
          )}
          {Math.random() > 0.5 && (
            <li className="text-white mb-10 text-lg font-medium">
              You had <strong>4,000 PION</strong> tokens in MEXC exchange.
            </li>
          )}
        </ul>
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

const ClaimTokenWalletWithoutBalance = () => {
  return (
    <>
      <p className="text-center text-xl font-medium max-w-[517px]">
        [Explainer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna ]
      </p>
      <div className="card bg-card-bg-v2 rounded-[18px] flex flex-col gap-6 justify-center items-center p-12 pb-8">
        <img src="/assets/images/migration/no-record-icon.svg" alt="" />
        <p className="text-gary4 text-lg font-medium">
          No record found, try another address
        </p>
      </div>
    </>
  );
};
export default Migration;

import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { ConnectWalletButton } from '../../components/Common/ConnectWalletButton.tsx';
import { useMigration } from '../../hooks/migration/useMigration.ts';

const Migration = () => {
  return (
    <div className="w-full page__bg">
      <div className="page flex flex-col md:!pt-48 items-center gap-6">
        <Hero />
        <Title />
        <Body />
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="flex gap-[10vw] md:gap-14">
      <img
        src="/assets/images/migration/pion-icon.svg"
        alt=""
        className="max-md:w-[20vw]"
      />
      <img
        src="/assets/images/migration/arrow-icon.svg"
        alt=""
        className="max-md:w-[10vw]"
      />
      <img
        src="/assets/images/migration/pion-v2-icon.svg"
        alt=""
        className="max-md:w-[20vw]"
      />
    </section>
  );
};

const Title = () => {
  return (
    <section className="text-[7vw] md:text-4xl flex gap-2">
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
      <p className="text-center text-xl font-normal md:text-xl md:font-medium w-full md:max-w-[517px]">
        [Explainer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna ]
      </p>
      <ConnectWalletButton size="md" withIcon light />
    </>
  );
};

const ClaimTokenBody = () => {
  const { amount } = useMigration();

  if (amount && amount.big > BigInt(0)) {
    return <ClaimTokenWalletWithBalance />;
  }

  return <ClaimTokenWalletWithoutBalance />;
};

const ClaimTokenWalletWithBalance = () => {
  return (
    <>
      <p className="text-center text-xl font-normal md:text-xl md:font-medium w-full md:max-w-[517px]">
        [Explainer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna ]
      </p>
      <div className="card bg-primary-L1-50 rounded-[18px] flex flex-col justify-between min-h-[290px] px-11 py-5 pr-6 md:pt-7 md:pl-14 md:pr-10 md:pb-8 w-full md:w-[517px]">
        <ul className="list-disc">
          {Math.random() > 0.2 && (
            <li className="text-white mb-3 text-lg font-medium">
              You had <strong>4000 PION</strong> tokens in your wallet at
              October 23rd, 2023 [Ethereum Mainnet Block #666].
            </li>
          )}
          {Math.random() > 0.2 && (
            <li className="text-white mb-10 text-lg font-medium">
              You had <strong>4000 PION</strong> tokens in MEXC exchange.
            </li>
          )}
        </ul>
        <button className="btn btn--white btn--medium-with-icon mx-auto">
          <img
            className="h-6 w-6"
            src="/assets/images/migration/claim-icon.svg"
            alt=""
          />
          <p className="text-inherit">Approve old PION</p>
        </button>
      </div>
    </>
  );
};

const ClaimTokenWalletWithoutBalance = () => {
  return (
    <>
      <p className="text-center text-xl font-normal md:text-xl md:font-medium w-full md:max-w-[517px]">
        [Explainer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna ]
      </p>
      <div className="card bg-card-bg-v2 rounded-[18px] flex flex-col gap-6 justify-center items-center p-12 pb-8">
        <img src="/assets/images/migration/no-record-icon.svg" alt="" />
        <p className="text-gary4 text-lg font-medium max-md:text-center">
          No record found, try another address <br />
          You have 200 PION to claim but you do not have this amount of old PION
          to burn.
        </p>
      </div>
    </>
  );
};
export default Migration;

import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { ConnectWalletButton } from '../../components/Common/ConnectWalletButton.tsx';
import { useMigration } from '../../hooks/migration/useMigration.ts';

const Migration = () => {
  return (
    <div className="w-full page__bg">
      <div className="page flex flex-col md:!pt-60 items-center gap-6">
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
      <p className="text-center text-xl font-normal md:text-xl md:font-medium w-full md:max-w-[517px]"></p>
      <ConnectWalletButton size="md" withIcon light />
    </>
  );
};

const ClaimTokenBody = () => {
  const { snapshotAmount, claimableAmount, oldTokenBalance } = useMigration();

  if (!oldTokenBalance || !claimableAmount || !snapshotAmount)
    return <LoadingCard />;

  if (snapshotAmount && snapshotAmount.big > BigInt(0)) {
    if (oldTokenBalance && oldTokenBalance.big < claimableAmount.big) {
      return <PleaseProvideMoreBalance />;
    }
    if (claimableAmount && claimableAmount.big > BigInt(0)) {
      return <ClaimTokenWalletWithBalance />;
    } else {
      return <AlreadyClaimedAvailableAmount />;
    }
  }
  return <ClaimTokenWalletWithoutBalance />;
};

const PleaseProvideMoreBalance = () => {
  const { oldTokenBalance, snapshotAmount } = useMigration();
  if (!oldTokenBalance || !snapshotAmount) return null;

  return (
    <>
      <p className="text-center text-xl font-normal md:text-xl md:font-medium w-full md:max-w-[517px]"></p>
      <div className="card bg-alert-red-20 rounded-[18px] flex flex-col text-center justify-between px-11 py-5 pr-6 w-full md:w-[517px]">
        <p className="text-white mb-3 text-lg font-medium">
          Currently, you have <strong>{oldTokenBalance.dsp} PION</strong> tokens
          in your wallet.
        </p>
        <p className="text-white text-lg font-medium">
          You need to have <strong>{snapshotAmount.dsp} PION</strong> tokens in
          your wallet to claim PION tokens.
        </p>
      </div>
    </>
  );
};

const LoadingCard = () => {
  return (
    <>
      <p className="text-center text-xl font-normal md:text-xl md:font-medium w-full md:max-w-[517px]"></p>
      <div className="card bg-primary-L1-50 rounded-[18px] flex flex-col justify-center min-h-[290px] px-11 py-5 pr-6 md:pt-7 md:pl-14 md:pr-10 md:pb-8 w-full items-center md:w-[517px]">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full text-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
        </div>
      </div>
    </>
  );
};

const ClaimTokenWalletWithBalance = () => {
  const {
    oldTokenAllowance,
    oldTokenBalance,
    snapshotAmount,
    claimableAmount,
    approveBalanceToHelper,
    claimNewToken,
  } = useMigration();

  if (
    !oldTokenAllowance ||
    !oldTokenBalance ||
    !snapshotAmount ||
    !claimableAmount
  )
    return null;

  return (
    <>
      <p className="text-center text-xl font-normal md:text-xl md:font-medium w-full md:max-w-[517px]"></p>
      <div className="card bg-primary-L1-50 rounded-[18px] flex flex-col justify-between min-h-[290px] px-11 py-5 pr-6 md:pt-7 md:pl-14 md:pr-10 md:pb-8 w-full md:w-[517px]">
        <ul className="list-disc">
          <li className="text-white mb-3 text-lg font-medium">
            You had <strong>{snapshotAmount.dsp} PION</strong> tokens in your
            wallet at October 23rd, 2023 [Ethereum Mainnet Block #18426798].
          </li>
          {/*{Math.random() > 0.0 && (*/}
          {/*  <li className="text-white mb-10 text-lg font-medium">*/}
          {/*    You had <strong> PION</strong> tokens in MEXC exchange.*/}
          {/*  </li>*/}
          {/*)}*/}
        </ul>
        {oldTokenAllowance.big < claimableAmount.big ? (
          <button
            onClick={() => approveBalanceToHelper()}
            className="btn btn--white btn--medium-with-icon mx-auto"
          >
            <p className="text-inherit">Approve old PION</p>
          </button>
        ) : (
          <button
            onClick={() => claimNewToken()}
            className="btn btn--white btn--medium-with-icon mx-auto"
          >
            <img
              className="h-6 w-6"
              src="/assets/images/migration/claim-icon.svg"
              alt=""
            />
            <p className="text-inherit">Claim PION</p>
          </button>
        )}
      </div>
    </>
  );
};

const ClaimTokenWalletWithoutBalance = () => {
  return (
    <>
      <p className="text-center text-xl font-normal md:text-xl md:font-medium w-full md:max-w-[517px]"></p>
      <div className="card bg-card-bg-v2 rounded-[18px] flex flex-col gap-6 justify-center items-center p-12 pb-8">
        <img src="/assets/images/migration/no-record-icon.svg" alt="" />
        <p className="text-gary4 text-lg font-medium text-center">
          No record found, try another address <br />
        </p>
      </div>
    </>
  );
};

const AlreadyClaimedAvailableAmount = () => {
  const { claimedAmount } = useMigration();

  if (!claimedAmount) return null;

  return (
    <>
      <p className="text-center text-xl font-normal md:text-xl md:font-medium w-full md:max-w-[517px]"></p>
      <div className="card bg-success-green-20 rounded-[18px] flex flex-col gap-6 justify-center items-center p-12 pb-12 md:min-w-[500px]">
        {/*<img src="/assets/images/migration/no-record-icon.svg" alt="" />*/}
        <p className="text-gary4 text-lg font-medium text-center">
          You claimed {claimedAmount.dsp} PION tokens.
        </p>
      </div>
    </>
  );
};
export default Migration;

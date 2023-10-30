const Migration = () => {
  return (
    <div className="w-full page__bg">
      <div className="page flex flex-col items-center justify-center gap-6">
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
  return (
    <section className="flex flex-col gap-12 items-center">
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
    </section>
  );
};
export default Migration;

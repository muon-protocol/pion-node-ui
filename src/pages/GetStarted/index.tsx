const GetStarted = () => {
  return (
    <div className="page page--get-started">
      <p className="text-white text-2xl font-light mb-6">
        You can obtain bonPION in two ways: either create a new one
        independently or claim it as a reward if you're part of the Muon
        pioneers
      </p>
      <p className="text-white text-xl font-light mb-4 mr-auto">
        You're a pioneer if you:
      </p>
      <span className="flex w-full gap-3 justify-stretch mb-12">
        <span className="get-started__pioneer-option">
          Joined the Muon Presale
        </span>
        <span className="get-started__pioneer-option">
          Joined the Deus Presale
        </span>
        <span className="get-started__pioneer-option">
          Operated an Alice Node
        </span>
      </span>
      <span className="get-started__actions">
        <span className="get-started__actions__action-container relative">
          <img
            className="get-started__actions__action__floating-object h-[186px] w-auto absolute -left-4 -bottom-9"
            src="/assets/images/get-started/new-bon-pion-floating-icon.svg"
            alt=""
          />
          <div className="get-started__actions__action">
            <img
              className="mb-12 h-16 w-auto"
              src="/assets/images/get-started/new-bon-pion-icon.svg"
              alt=""
            />
            <div className="text-2xl font-light text-white text-center">
              Get Started with a New bonPION
            </div>
          </div>
        </span>
        <span className="get-started__actions__action-container relative">
          <img
            className="get-started__actions__action__floating-object h-[203px] w-auto absolute -top-7 -right-20"
            src="/assets/images/get-started/muan-pioneer-floating-icon.svg"
            alt=""
          />
          <div className="get-started__actions__action">
            <img
              className="mb-12 h-16 w-auto"
              src="/assets/images/get-started/muan-pioneer.svg"
              alt=""
            />
            <div className="text-2xl font-light text-white text-center">
              Claim as a Muon Pioneer
            </div>
          </div>
        </span>
      </span>
    </div>
  );
};

export default GetStarted;

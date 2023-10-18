import { FadeIn } from '../../animations';

const Home = () => {
  return (
    <div className="page__bg--buy-pion">
      <div className="page page--buy-pion page--centered flex flex-col md:px-10 gap-6">
        <FadeIn className="mr-auto" delay={0} duration={0.3}>
          <p className="text-2xl font-medium">Buy $PION</p>
        </FadeIn>
        <FadeIn className="mr-auto" delay={0.1} duration={0.3}>
          <p className="text-xl">[Where to buy explainer]</p>
        </FadeIn>
        <div className="steps flex w-full flex-col gap-12 md:gap-8 md:flex-row justify-between">
          <FadeIn className="w-1/3" delay={0.2} duration={0.3}>
            <div
              className={`shop-card flex flex-col items-center py-10 px-11 justify-between bg-cover bg-no-repeat bg-center rounded-3xl h-[270px] md:w-full gap-4`}
              style={{
                backgroundImage: `url(/assets/images/buy-pion/background-1.svg)`,
              }}
            >
              <span className="flex flex-col gap-2 items-center justify-center">
                <span className="flex items-end gap-2">
                  <img src="/assets/images/buy-pion/uniswap.svg" alt="" />
                  <p className="text-2xl font-medium text-center font-tomorrow">
                    Uniswap
                  </p>
                </span>
                <span className="flex gap-2">
                  <p className="text-lg font-medium text-center text-light-text">
                    on
                  </p>
                  <img src="/assets/images/buy-pion/eth.svg" alt="" />
                  <p className="text-lg font-bold text-white text-center">
                    Ethereum Mainnet
                  </p>
                </span>
              </span>
              <button className="btn !px-5 !w-full">Buy on UNISWAP</button>
            </div>
          </FadeIn>

          <FadeIn className="w-1/3" delay={0.3} duration={0.3}>
            <div
              className={`shop-card flex flex-col items-center py-10 px-11 justify-between bg-cover bg-no-repeat bg-center rounded-3xl h-[270px] md:w-full gap-4`}
              style={{
                backgroundImage: `url(/assets/images/buy-pion/background-2.svg)`,
              }}
            >
              <span className="flex flex-col gap-2 items-center justify-center">
                <span className="flex items-end gap-2">
                  <img src="/assets/images/buy-pion/uniswap.svg" alt="" />
                  <p className="text-2xl font-medium text-center font-tomorrow">
                    Uniswap
                  </p>
                </span>
                <span className="flex gap-2">
                  <p className="text-lg font-medium text-center text-light-text">
                    on
                  </p>
                  <img src="/assets/images/buy-pion/arb.svg" alt="" />
                  <p className="text-lg font-bold text-white text-center">
                    Arbitrum One
                  </p>
                </span>
              </span>
              <button className="btn !px-5 !w-full">Buy on UNISWAP</button>
            </div>
          </FadeIn>

          <FadeIn className="w-1/3" delay={0.4} duration={0.3}>
            <div
              className={`shop-card flex flex-col items-center py-10 px-11 justify-between bg-cover bg-no-repeat bg-center rounded-3xl h-[270px] md:w-full gap-4`}
              style={{
                backgroundImage: `url(/assets/images/buy-pion/background-3.svg)`,
              }}
            >
              <span className="flex flex-col gap-2 items-center justify-center">
                <span className="flex items-end gap-2">
                  <img src="/assets/images/buy-pion/MEXC.svg" alt="" />
                  <p className="text-2xl font-medium text-center font-tomorrow">
                    MEXC
                  </p>
                </span>
                <span className="flex gap-2">
                  <p className="text-lg font-medium text-center text-white">
                    Centralized Exchange
                  </p>
                </span>
              </span>
              <button className="btn !px-5 !w-full">Buy on MEXC</button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Home;

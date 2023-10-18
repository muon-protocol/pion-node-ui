import { useMemo } from 'react';

interface Shop {
  id: number;
  title: string;
  network: string;
  description: string;
  link: string;
  img: string;
  background: string;
}

const Home = () => {
  const shop: Shop[] = useMemo(() => {
    return [
      {
        id: 1,
        title: 'Uniswap',
        network: 'ETH',
        description: 'Buy $PION on Uniswap',
        link: 'https://app.uniswap.org/swap?theme=dark&exactField=input&exactAmount=10&inputCurrency=ETH&outputCurrency=0xf81df93ab37d5b1396139f294418b2741143b280',
        img: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=026',
        background: '/assets/images/buy-pion/background-1.svg',
      },
      {
        id: 2,
        title: 'Uniswap',
        network: 'ARB',
        description: 'Buy $PION on Uniswap',
        link: 'https://app.uniswap.org/swap?theme=dark&exactField=input&exactAmount=10&inputCurrency=ETH&outputCurrency=0xf81df93ab37d5b1396139f294418b2741143b280',
        img: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=026',
        background: '/assets/images/buy-pion/background-2.svg',
      },
      {
        id: 3,
        title: 'MEXC',
        network: 'ETH',
        description: 'Buy $PION on MEXC',
        link: 'https://www.mexc.com/exchange/PION_USDT',
        img: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/544.png',
        background: '/assets/images/buy-pion/background-3.svg',
      },
    ];
  }, []);

  return (
    <div className="page__bg--buy-pion">
      <div className="page page--buy-pion page--centered flex flex-col md:px-10 gap-6">
        <p className="text-2xl font-medium mr-auto">Buy $PION</p>
        <p className="text-xl mr-auto">[Where to buy explainer]</p>
        <div className="steps flex w-full flex-col gap-12 md:gap-8 md:flex-row justify-between">
          <div
            className={`shop-card flex flex-col items-center py-10 px-11 justify-between bg-cover bg-no-repeat bg-center rounded-3xl h-[270px] md:w-1/3 gap-4`}
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

          <div
            className={`shop-card flex flex-col items-center py-10 px-11 justify-between bg-cover bg-no-repeat bg-center rounded-3xl h-[270px] md:w-1/3 gap-4`}
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

          <div
            className={`shop-card flex flex-col items-center py-10 px-11 justify-between bg-cover bg-no-repeat bg-center rounded-3xl h-[270px] md:w-1/3 gap-4`}
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
        </div>
      </div>
    </div>
  );
};

export default Home;

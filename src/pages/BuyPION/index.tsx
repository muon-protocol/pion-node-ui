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
    <div className="page__bg--home">
      <div className="page page--home page--centered flex flex-col md:px-10 gap-6">
        <p className="text-2xl font-medium mr-auto">Buy $PION</p>
        <p className="text-xl mr-auto">[Where to buy explainer]</p>
        <div className="steps flex flex-col gap-12 md:gap-8 md:flex-row justify-between">
          {shop.map((item) => (
            <ShopCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ShopCard = ({ item }: { item: Shop }) => {
  return (
    <div
      className="shop-card flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center gap-4 w-full md:w-1/3"
      style={{ background: `${item.background}` }}
    >
      <img src={item.img} alt="" className="w-16 h-16" />
      <p className="text-lg font-medium text-center">{item.title}</p>
      <p className="text-lg font-medium text-center">{item.network}</p>
      <p className="text-lg font-medium text-center">{item.description}</p>
    </div>
  );
};
export default Home;

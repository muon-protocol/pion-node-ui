import { Link } from 'react-router-dom';
import { FadeIn } from '../../animations';

const Navbar = () => {
  return (
    <FadeIn delay={0.3}>
      <div className="navbar flex justify-between items-center py-9 pl-14 pr-12">
        <div className="navbar__left">
          <Link to={'/'}>
            <img
              src="/assets/images/navbar/logo.svg"
              alt={''}
              className="w-[120px] h-auto"
            />
          </Link>
        </div>
        <div className="navbar__right flex justify-end items-center gap-4">
          <Link className={'flex--1'} to={'/create'}>
            <button className="btn btn--small">Create BonPION</button>
          </Link>
          <button className="btn btn--small">Buy PION</button>
          <button className="btn btn--small btn--dark-primary">
            Balance: <strong className="ml-2 mr-1">2310.013</strong>
            <strong className="text-xyz-75">PION</strong>
          </button>
          <button className="btn btn--small btn--dark-primary">
            0x5a03…c7ef
          </button>
        </div>
      </div>
    </FadeIn>
  );
};

export default Navbar;

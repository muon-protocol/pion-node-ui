import logo from '../../assets/images/navbar/logo.svg';

const Navbar = () => {
  return (
    <div className="navbar flex justify-between items-center py-9 pl-14 pr-12">
      <div className="navbar__left">
        <img src={logo} alt={''} className="w-[120px] h-auto" />
      </div>
      <div className="navbar__right flex justify-end items-center gap-4">
        <button className="btn btn--small">Create BonPION</button>
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
  );
};

export default Navbar;

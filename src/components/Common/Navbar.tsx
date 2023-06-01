import logo from '../../assets/images/navbar/logo.svg';

const Navbar = () => {
  return (
    <div className="navbar flex justify-between py-9 pl-14 pr-12">
      <div className="navbar__left">
        <img src={logo} alt={''} className="w-[120px] h-auto" />
      </div>
      <div className="navbar__right">
        <button className="btn btn--primary btn--small">Buy PION</button>
      </div>
    </div>
  );
};

export default Navbar;

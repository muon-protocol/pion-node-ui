import strings from '../../constants/strings.ts';

export const Footer = () => {
  return (
    <footer className="footer p-6 flex items-center justify-center absolute -translate-y-full w-full">
      <img src={strings.footerLogoSrc} alt="" />
    </footer>
  );
};

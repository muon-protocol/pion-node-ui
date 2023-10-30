const strings = {
  PION: {
    token: 'PION',
    tokens: 'PIONs',
    nft: 'bonPION',
    nfts: 'bonPIONs',
    sidebar: {
      logoSrc: '/assets/images/sidebar/logo.svg',
      logoTextSrc: '/assets/images/sidebar/logo-text.svg',
      nftLogoSrc: '/assets/images/sidebar/pion-nft-logo.svg',
      tokenLogoSrc: '/assets/images/sidebar/pion-token-logo.svg',
    },
  },
  ALICE: {
    token: 'ALICE',
    tokens: 'ALICEs',
    nft: 'bonALICE',
    nfts: 'bonALICEs',
    sidebar: {
      logoSrc: '/assets/images/sidebar/alice-logo.svg',
      logoTextSrc: '/assets/images/sidebar/alice-logo-text.svg',
      nftLogoSrc: '/assets/images/sidebar/alice-nft-logo.svg',
      tokenLogoSrc: '/assets/images/sidebar/alice-token-logo.svg',
    },
  },
};

export default strings[import.meta.env.VITE_PROJECT_NAME as 'PION' | 'ALICE'];

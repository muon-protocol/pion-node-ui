const strings = {
  PION: {
    token: 'PION',
    tokens: 'PIONs',
    nft: 'bonPION',
    nfts: 'bonPIONs',
  },
  ALICE: {
    token: 'ALICE',
    tokens: 'ALICEs',
    nft: 'bonALICE',
    nfts: 'bonALICEs',
  },
};

export default strings[import.meta.env.VITE_PROJECT_NAME as 'PION' | 'ALICE'];

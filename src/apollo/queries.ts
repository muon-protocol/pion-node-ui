import { gql } from './__generated__/gql';

export const USER_BON_ALICES = gql(
  `query MyQuery ($address){{ accountTokenIds (where: {{
    haveThisToken: true, account: "$address"}}) {{
      account
      latestTimestamp
      tokenId
    }}
  }}`,
);

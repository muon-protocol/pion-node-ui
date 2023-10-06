// import useActions from '../../contexts/Actions/useActions.ts';
// import { ActionType } from '../../types';
// import { FadeIn, Scale } from '../../animations';
// import { AnimatePresence } from 'framer-motion';

import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';

const ActionsHeader = () => {
  // const { selectedAction } = useActions();
  const { muonNodeStakingUsers } = useMuonNodeStaking();

  return (
    <div className="actions-header flex items-center w-full">
      {/*<div className="w-[90px]">{renderActionImageAndName(selectedAction)}</div>*/}
      {/*<div className="w-full">*/}
      {/*  <p className="text-center md:text-left md:text-lg font-light text-white md:min-h-[112px]">*/}
      {/*    {renderActionDescription(selectedAction)}*/}
      {/*  </p>*/}
      {/*</div>*/}

      {muonNodeStakingUsers && muonNodeStakingUsers[4] !== BigInt(0) && (
        <div
          className="ml-auto flex gap-1.5 items-center cursor-pointer"
          onClick={() => window.open('/dashboard', '_self')}
        >
          <img src="/assets/images/actions/back-icon.svg" alt="" />
          <p className="font-medium text-sm underline ">Back to Dashboard</p>
        </div>
      )}
    </div>
  );
};

// const renderActionImageAndName = (action: ActionType) => {
//   return (
//     <div className="w-[90px] flex flex-col justify-center items-center gap-2">
//       <div className="action-image relative min-h-[32px] md:min-h-[54px] flex justify-center w-full">
//         {renderActionImage(action)}
//       </div>
//       <div className="action-name text-primary-10-solid text-xl font-medium flex justify-center w-full text-center">
//         {renderActionName(action)}
//       </div>
//     </div>
//   );
// };

// const renderActionImage = (action: ActionType) => {
//   return (
//     <>
//       <AnimatePresence>
//         {action === ActionType.CREATE ? (
//           <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
//             <img
//               className="w-8 h-8 md:w-[52px] md:h-[52px]"
//               src="/assets/images/actions/create-icon.svg"
//               alt="create"
//             />
//           </Scale>
//         ) : action === ActionType.UPGRADE ? (
//           <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
//             <img
//               className="w-8 h-8 md:w-[52px] md:h-[52px]"
//               src="/assets/images/actions/upgrade-icon.svg"
//               alt="upgrade"
//             />
//           </Scale>
//         ) : action === ActionType.MERGE ? (
//           <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
//             <img
//               className="w-8 h-8 md:w-[52px] md:h-[52px]"
//               src="/assets/images/actions/merge-icon.svg"
//               alt="merge"
//             />
//           </Scale>
//         ) : action === ActionType.SPLIT ? (
//           <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
//             <img
//               className="w-8 h-8 md:w-[52px] md:h-[52px]"
//               src="/assets/images/actions/split-icon.svg"
//               alt="split"
//             />
//           </Scale>
//         ) : action === ActionType.TRANSFER ? (
//           <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
//             <img
//               className="w-8 h-8 md:w-[52px] md:h-[52px]"
//               src="/assets/images/actions/transfer-icon.svg"
//               alt="transfer"
//             />
//           </Scale>
//         ) : (
//           <></>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };
//
// const renderActionDescription = (action: ActionType) => {
//   return (
//     <>
//       {action === ActionType.CREATE ? (
//         <FadeIn key={action} duration={0.1} delay={0.1}>
//           <p>
//             Begin your journey by crafting your Bonded PION NFT This requires
//             locking PION and PION LP tokens. Remember, the amount of tokens you
//             lock will directly influence your NFT Power, tier, and rewards.
//           </p>
//         </FadeIn>
//       ) : action === ActionType.UPGRADE ? (
//         <FadeIn key={action} duration={0.1} delay={0.1}>
//           <p>
//             Boost your Node Power by adding more PION and ALICE LP tokens to your
//             Bonded ALICE NFT. This upgrade could change your tier and enhance
//             your APR.
//           </p>
//         </FadeIn>
//       ) : action === ActionType.MERGE ? (
//         <FadeIn key={action} duration={0.1} delay={0.1}>
//           <p>
//             Choose two bonALICEs from your collection to merge into a single,
//             more powerful NFT for increased earnings.
//           </p>
//         </FadeIn>
//       ) : action === ActionType.SPLIT ? (
//         <FadeIn key={action} duration={0.1} delay={0.1}>
//           <p>
//             Choose a bonALICE to split and adjust the slider to distribute the
//             power as desired.
//           </p>
//         </FadeIn>
//       ) : action === ActionType.TRANSFER ? (
//         <FadeIn key={action} duration={0.1} delay={0.1}>
//           <p>
//             Choose a bonALICE from your collection, then enter the destination
//             address where you want to send it.
//           </p>
//         </FadeIn>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };
//
// const renderActionName = (action: ActionType) => {
//   return (
//     <>
//       <AnimatePresence>
//         {action === ActionType.CREATE ? (
//           <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
//             <p>Create</p>
//           </Scale>
//         ) : action === ActionType.UPGRADE ? (
//           <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
//             <p>Upgrade</p>
//           </Scale>
//         ) : action === ActionType.MERGE ? (
//           <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
//             <p>Merge</p>
//           </Scale>
//         ) : action === ActionType.SPLIT ? (
//           <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
//             <p>Split</p>
//           </Scale>
//         ) : action === ActionType.TRANSFER ? (
//           <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
//             <p>Transfer</p>
//           </Scale>
//         ) : (
//           <></>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

export default ActionsHeader;

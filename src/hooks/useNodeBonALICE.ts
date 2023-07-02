import { useState } from 'react';
import { BonALICE } from '../types';

const useNodeBonALICE = () => {
  const [nodeBonALICE, setNodeBonALICE] = useState<BonALICE | null>(null);
  const [isSelectNodeBonALICEModalOpen, setIsSelectNodeBonALICEModalOpen] =
    useState(false);
  const [nodeIP, setNodeIP] = useState<string>('');

  const handleAddNodeClicked = () => {
    if (!nodeIP || !nodeBonALICE) return;
    console.log('Add Node');
  };

  return {
    nodeBonALICE,
    setNodeBonALICE,
    isSelectNodeBonALICEModalOpen,
    setIsSelectNodeBonALICEModalOpen,
    nodeIP,
    setNodeIP,
    handleAddNodeClicked,
  };
};

export default useNodeBonALICE;

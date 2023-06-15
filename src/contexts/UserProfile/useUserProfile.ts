import { useContext } from 'react';
import { UserProfileContext } from './UserProfileContext.tsx';

const useUserProfile = () => {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }

  return context;
};

export default useUserProfile;

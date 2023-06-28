import { createContext, ReactNode } from 'react';
import {
  Notification,
  NotificationStatuses,
  NotificationType,
} from '../../types';
import toast from 'react-hot-toast';
import { waitForTransaction } from '@wagmi/core';

const NotificationsContext = createContext<{
  addNotification: (notification: Notification) => any;
  removeNotification: (toastId: string) => void;
}>({
  addNotification: () => {},
  removeNotification: () => {},
});

const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const addNotification = async (notification: Notification) => {
    let toastId;
    if (notification.type === NotificationType.PROMISE && notification.hash) {
      const data = waitForTransaction({
        hash: notification.hash,
      });

      await toast.promise(data, {
        loading: 'Waiting for notification to be mined',
        success: 'Notification mined!',
        error: 'Notification failed',
      });
    } else if (notification.type === NotificationType.TIMEOUT) {
      toast.loading(notification.message, {
        duration: 5000,
      });
    } else if (notification.type === NotificationType.PENDING) {
      if (notification.status === NotificationStatuses.FAILED) {
        toast.error(notification.message, {
          id: notification.id,
        });
      } else if (notification.status === NotificationStatuses.PENDING) {
        toast.loading(notification.message, {
          id: notification.id,
        });
      } else if (notification.status === NotificationStatuses.SUCCESS) {
        toast.success(notification.message, {
          id: notification.id,
        });
      }
    }
    console.log('toastId', toastId);
    return toastId;
  };

  const removeNotification = (toastId: string) => {
    console.log('removeNotification', toastId);
    toast.remove(toastId);
  };

  return (
    <NotificationsContext.Provider
      value={{
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsProvider, NotificationsContext };

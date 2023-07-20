import { ReactNode, useCallback } from 'react';

const Notification = ({
  children,
  type = 'info',
  show,
}: {
  children: ReactNode;
  type: 'error' | 'info';
  show: boolean;
}) => {
  const typeStyles = useCallback(() => {
    if (type === 'error') {
      return 'bg-alert-red-20';
    } else if (type === 'info') {
      return 'bg-pacific-blue-20';
    }
  }, [type]);

  const typeIcon = useCallback(() => {
    if (type === 'error') {
      return '/assets/images/review/alert-icon.svg';
    } else if (type === 'info') {
      return '/assets/images/review/info-icon.svg';
    }
    return '';
  }, [type]);

  return (
    <>
      {show && (
        <div
          className={`${typeStyles()} rounded-2xl flex gap-6 py-5 px-6 items-center`}
        >
          <img src={typeIcon()} alt="" />
          <p className="leading-5">{children}</p>
        </div>
      )}
    </>
  );
};

export default Notification;

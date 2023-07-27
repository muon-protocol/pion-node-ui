import { ReactNode, useCallback } from 'react';

const Notification = ({
  children,
  type = 'info',
  show,
  className = '',
}: {
  children: ReactNode;
  type: 'error' | 'info' | 'success';
  show: boolean;
  className?: string;
}) => {
  const typeStyles = useCallback(() => {
    if (type === 'error') {
      return 'bg-alert-red-20';
    } else if (type === 'info') {
      return 'bg-pacific-blue-20';
    } else if (type === 'success') {
      return 'bg-success-green-20';
    }
  }, [type]);

  const typeIcon = useCallback(() => {
    if (type === 'error') {
      return '/assets/images/review/alert-icon.svg';
    } else if (type === 'info') {
      return '/assets/images/review/info-icon.svg';
    } else if (type === 'success') {
      return '/assets/images/review/success-icon.svg';
    }
    return '';
  }, [type]);

  return (
    <>
      {show && (
        <div
          className={`${typeStyles()} ${className} flex w-fit gap-2.5 py-[14px] p-3 rounded-lg md:px-4 md:pr-5 items-center`}
        >
          <img src={typeIcon()} alt="" className="w-7 h-7" />
          <p className="text-sm">{children}</p>
        </div>
      )}
    </>
  );
};

export default Notification;

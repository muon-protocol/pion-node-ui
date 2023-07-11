import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event: any) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref]);

  return ref;
};

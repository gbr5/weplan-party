import React, { memo, useCallback, useEffect } from 'react';

import { Container, OutContainer } from './styles';

interface IProps {
  number: number[];
  xRef: React.RefObject<HTMLElement>;
  id: string;
  onScroll: (e: WheelEvent) => void;
}

const Panel: React.FC<IProps> = ({ number, id, onScroll, xRef }: IProps) => {
  useEffect(() => {
    document
      .getElementById(id)
      ?.addEventListener('wheel', onScroll, { passive: true });
  }, [onScroll, id]);

  const onTouchHour = useCallback((e: TouchEvent) => {
    console.log(e.changedTouches[0].screenX);
  }, []);

  useEffect(() => {
    console.log('cima', document.getElementById('cima')?.getBoundingClientRect);
    console.log(
      'container',
      document.getElementById(id)?.getBoundingClientRect,
    );
    console.log(
      'baixo',
      document.getElementById('baixo')?.getBoundingClientRect,
    );
    document.getElementById(id)?.addEventListener('touchend', onTouchHour);
  }, [onTouchHour, id]);
  return (
    <OutContainer>
      <Container id={id}>
        {number.map(n => {
          const num = String(n).padStart(2, '0').split('');
          const numid = String(num[0] + num[1]);
          return numid === '00' || numid === '05' ? (
            <div key={numid}>
              <strong id={numid} ref={xRef}>
                {num[0]}
              </strong>
              <strong>{num[1]}</strong>
            </div>
          ) : (
            <div key={numid}>
              <strong id={numid}>{num[0]}</strong>
              <strong>{num[1]}</strong>
            </div>
          );
        })}
      </Container>
    </OutContainer>
  );
};

export default memo(Panel);

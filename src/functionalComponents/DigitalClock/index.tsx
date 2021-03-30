import React, { useCallback, useEffect, useRef, useState } from 'react';
import Panel from './Panel';

import { Container } from './styles';

// interface IProps {
//   defaultTime: string;
//   handleSetTime: Function;
// }

const DigitalClock: React.FC = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const startHour = new Date().getHours();
  const startMinute = new Date().getMinutes();
  const [selectedHour, setSelectedHour] = useState(startHour);
  const [selectedMinute, setSelectedMinute] = useState(startMinute);

  const onScrollHour = useCallback(
    (e: WheelEvent) => {
      if (e.deltaY > 0 && selectedHour === 23) {
        return setSelectedHour(0);
      }
      if (e.deltaY < 0 && selectedHour === 0) {
        return setSelectedHour(23);
      }
      if (e.deltaY > 0) {
        return setSelectedHour(selectedHour + 1);
      }
      if (e.deltaY < 0) {
        return setSelectedHour(selectedHour - 1);
      }
      return 0;
    },
    [selectedHour],
  );
  const onScrollMinute = useCallback(
    (e: WheelEvent) => {
      if (e.deltaY > 0 && selectedMinute === 59) {
        return setSelectedMinute(0);
      }
      if (e.deltaY < 0 && selectedMinute === 0) {
        return setSelectedMinute(59);
      }
      if (e.deltaY > 0) {
        return setSelectedMinute(selectedMinute + 1);
      }
      if (e.deltaY < 0) {
        return setSelectedMinute(selectedMinute - 1);
      }
      return 0;
    },
    [selectedMinute],
  );

  // useEffect(() => {
  //   document
  //     .getElementById('mainHour')
  //     ?.addEventListener('wheel', onScrollHour, { passive: true });
  // }, [onScrollHour]);
  // useEffect(() => {
  //   document
  //     .getElementById('mainMinute')
  //     ?.addEventListener('wheel', onScrollMinute, { passive: true });
  // }, [onScrollMinute]);

  const sectionRef = useRef<HTMLElement>(null);
  const strongRef = useRef<HTMLElement>(null);

  useEffect(() => {
    console.log(sectionRef.current?.id);
    console.log(strongRef.current?.id);
    console.log(strongRef.current?.hidden);
  }, []);

  return (
    <Container>
      <section id="oi" ref={sectionRef}>
        <Panel
          xRef={strongRef}
          id="mainHour"
          onScroll={(e: WheelEvent) => onScrollHour(e)}
          number={hours}
        />
      </section>
      <p>:</p>
      <section>
        <Panel
          xRef={strongRef}
          id="mainMinute"
          onScroll={(e: WheelEvent) => onScrollMinute(e)}
          number={minutes}
        />
      </section>
    </Container>
  );
};

export default DigitalClock;

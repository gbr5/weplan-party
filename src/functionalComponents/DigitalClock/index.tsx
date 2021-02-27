import React, { useCallback, useState } from 'react';
import Panel from './Panel';

import { Container } from './styles';

// interface IProps {
//   defaultTime: string;
//   handleSetTime: Function;
// }

const DigitalClock: React.FC = () => {
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

  return (
    <Container>
      <section>
        <Panel
          id="mainHour"
          onScroll={(e: WheelEvent) => onScrollHour(e)}
          number={selectedHour}
        />
      </section>
      <p>:</p>
      <section>
        <Panel
          id="mainMinute"
          onScroll={(e: WheelEvent) => onScrollMinute(e)}
          number={selectedMinute}
        />
      </section>
    </Container>
  );
};

export default DigitalClock;

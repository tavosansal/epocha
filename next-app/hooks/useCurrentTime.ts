import { useEffect, useState } from 'react';
import moment from 'moment-timezone';

export default function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState<number>(() => moment().unix());

  useEffect(() => {
    const id = setInterval(() => setCurrentTime(moment().unix()), 1000);
    return () => clearInterval(id);
  }, []);

  const timezones: string[] = moment.tz.names();
  const guess: string = moment.tz.guess();

  return { currentTime, timezones, currentTimezone: guess };
}

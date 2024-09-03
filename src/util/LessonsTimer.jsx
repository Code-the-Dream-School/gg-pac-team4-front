import { useEffect, useState } from 'react';
const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(targetDate)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  function calculateTimeRemaining(targetDate) {
    const now = new Date();
    const difference = targetDate - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <p className="font-semibold">
      <span className="font-normal">
        {' '}
        Your lesson starts in <br />
      </span>
      {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m{' '}
      {timeRemaining.seconds}s
    </p>
  );
};

export default CountdownTimer;

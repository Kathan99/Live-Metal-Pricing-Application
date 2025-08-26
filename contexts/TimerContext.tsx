import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface TimerContextType {
  countdown: number;
  lastUpdated: number | null;
}

const TimerContext = createContext<TimerContextType>({
  countdown: 30,
  lastUpdated: null,
});

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [countdown, setCountdown] = useState(30);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  useEffect(() => {

    const masterInterval = setInterval(() => {
      setLastUpdated(Date.now());
      setCountdown(30);
    }, 30000);

    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    setLastUpdated(Date.now());

    return () => {
      clearInterval(masterInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <TimerContext.Provider value={{ countdown, lastUpdated }}>
      {children}
    </TimerContext.Provider>
  );
};
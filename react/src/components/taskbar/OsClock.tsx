import { useEffect, useState, type FunctionComponent } from "react";

const OsClock: FunctionComponent = () => {
  const [time, setTime] = useState<string | undefined>("00:00:00");

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleString());
    });
  }, []);

  return <div className="mr-12">{time}</div>;
};

export default OsClock;

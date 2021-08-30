import { useState, useEffect } from "react";

interface Props {
  width: number;
  height: number;
}

function getDivDimensions(ref: React.RefObject<HTMLDivElement>): Props {
  return {
    width: ref.current?.clientWidth || 0,
    height: ref.current?.clientHeight || 0,
  };
}

export default function useDivDimensions(
  ref: React.RefObject<HTMLDivElement>
): Props {
  const [divDimensions, setDivDimensions] = useState(getDivDimensions(ref));
  useEffect(() => {
    const listener = () => setDivDimensions(getDivDimensions(ref));
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [ref]);
  useEffect(() => {
    setDivDimensions(getDivDimensions(ref));
  }, [ref]);
  return divDimensions;
}

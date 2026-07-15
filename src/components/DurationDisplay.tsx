"use client";
import { useEffect, useState } from "react";

const DurationDisplay = ({ audioLink }: { audioLink: string }) => {
  const [duration, setDuration] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio(audioLink);
    const handleLoaded = () => {
      const m = Math.floor(audio.duration / 60);
      const s = Math.floor(audio.duration % 60);
      setDuration(`${m}:${s.toString().padStart(2, "0")}`);
    };
    audio.addEventListener("loadedmetadata", handleLoaded);
    return () => audio.removeEventListener("loadedmetadata", handleLoaded);
  }, [audioLink]);

  return <>{duration ?? "--:--"}</>;
};

export default DurationDisplay;
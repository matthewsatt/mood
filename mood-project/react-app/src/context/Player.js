import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

// One shared audio player for the whole app. Song rows call toggle(song);
// <PlayerBar /> renders the actual <audio> element.
const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef();

  const audio = useCallback(
    () => playerRef.current && playerRef.current.audio.current,
    []
  );

  const toggle = useCallback(
    (song) => {
      if (current && current.id === song.id) {
        isPlaying ? audio().pause() : audio().play();
      } else {
        setCurrent(song);
      }
    },
    [current, isPlaying, audio]
  );

  const stop = useCallback(() => {
    if (audio()) audio().pause();
    setCurrent(null);
    setIsPlaying(false);
  }, [audio]);

  // Keep the bar in sync when the playing song is edited or deleted
  const songChanged = useCallback((song) => {
    setCurrent((playing) => (playing && playing.id === song.id ? song : playing));
  }, []);

  const songRemoved = useCallback(
    (id) => {
      if (current && current.id === id) stop();
    },
    [current, stop]
  );

  const value = useMemo(
    () => ({ current, isPlaying, setIsPlaying, playerRef, toggle, stop, songChanged, songRemoved }),
    [current, isPlaying, toggle, stop, songChanged, songRemoved]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => useContext(PlayerContext);

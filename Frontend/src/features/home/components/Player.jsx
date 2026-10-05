import { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  SpeakerHigh,
  SpeakerSlash,
  ArrowCounterClockwise,
  ArrowClockwise,
} from "@phosphor-icons/react";
import "../style/player.scss";

const Player = () => {
  const {
    song,
    isPlaying,
    setIsPlaying,
    playNext,
    playPrev,
    isShuffle,
    toggleShuffle,
    isRepeat,
    toggleRepeat,
    audioRef,
  } = useSong();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.85);

  // Sync play/pause with HTML audio
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio playback delayed or user gesture needed:", err);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, song?.url, audioRef, setIsPlaying]);

  // Reset progress when track changes
  useEffect(() => {
    setCurrentTime(0);
  }, [song?.url]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const seekRelative = (seconds) => {
    const audio = audioRef?.current;
    if (!audio) return;
    const target = Math.min(Math.max(audio.currentTime + seconds, 0), audio.duration || 0);
    audio.currentTime = target;
    setCurrentTime(target);
  };

  const handleProgressChange = (e) => {
    const nextTime = Number(e.target.value);
    if (audioRef?.current) {
      audioRef.current.currentTime = nextTime;
    }
    setCurrentTime(nextTime);
  };

  const handleVolumeChange = (e) => {
    const nextVolume = Number(e.target.value);
    setVolume(nextVolume);
    if (audioRef?.current) {
      audioRef.current.volume = nextVolume;
    }
    setIsMuted(nextVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef?.current) return;

    if (isMuted) {
      const restore = prevVolume > 0 ? prevVolume : 0.85;
      audioRef.current.volume = restore;
      setVolume(restore);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      audioRef.current.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!song) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <footer className="player-dock" aria-label="Music Player Control Bar">
      <audio
        ref={audioRef}
        src={song.url}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => {
          if (isRepeat && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            playNext();
          }
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <div className="player-dock__inner">
        {/* Track details (Left) */}
        <div className="player-track">
          <div className={`player-track__art-wrap ${isPlaying ? "player-track__art-wrap--playing" : ""}`}>
            <img
              src={song.posterUrl}
              alt={song.title}
              className="player-track__art"
            />
          </div>
          <div className="player-track__info">
            <h3 className="player-track__title">{song.title}</h3>
            <div className="player-track__meta">
              <span className="player-track__artist">{song.artist || "MoodSync Curated"}</span>
              <span className="player-track__mood-badge capitalize">{song.mood}</span>
            </div>
          </div>
        </div>

        {/* Center: Controls & Scrubber */}
        <div className="player-controls">
          <div className="player-controls__buttons">
            <button
              type="button"
              className={`ctrl-btn ${isShuffle ? "ctrl-btn--active" : ""}`}
              onClick={toggleShuffle}
              title="Shuffle"
              aria-label="Shuffle playback"
            >
              <Shuffle size={18} weight={isShuffle ? "bold" : "regular"} />
            </button>

            <button
              type="button"
              className="ctrl-btn"
              onClick={() => seekRelative(-10)}
              title="Skip back 10s"
              aria-label="Skip back 10 seconds"
            >
              <ArrowCounterClockwise size={18} />
            </button>

            <button
              type="button"
              className="ctrl-btn"
              onClick={playPrev}
              title="Previous Track"
              aria-label="Previous Track"
            >
              <SkipBack size={20} weight="fill" />
            </button>

            <button
              type="button"
              className="ctrl-btn ctrl-btn--play"
              onClick={togglePlayback}
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" />}
            </button>

            <button
              type="button"
              className="ctrl-btn"
              onClick={playNext}
              title="Next Track"
              aria-label="Next Track"
            >
              <SkipForward size={20} weight="fill" />
            </button>

            <button
              type="button"
              className="ctrl-btn"
              onClick={() => seekRelative(10)}
              title="Skip forward 10s"
              aria-label="Skip forward 10 seconds"
            >
              <ArrowClockwise size={18} />
            </button>

            <button
              type="button"
              className={`ctrl-btn ${isRepeat ? "ctrl-btn--active" : ""}`}
              onClick={toggleRepeat}
              title="Repeat"
              aria-label="Repeat track"
            >
              <Repeat size={18} weight={isRepeat ? "bold" : "regular"} />
            </button>
          </div>

          <div className="player-timeline">
            <span className="time-text tabular-nums">{formatTime(currentTime)}</span>
            <div className="scrubber-wrapper">
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(currentTime, duration || 0)}
                onChange={handleProgressChange}
                className="scrubber-input"
                aria-label="Seek track position"
                style={{
                  background: `linear-gradient(to right, var(--accent-current) ${progressPercent}%, rgba(255, 255, 255, 0.15) ${progressPercent}%)`,
                }}
              />
            </div>
            <span className="time-text tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Equalizer (Right) */}
        <div className="player-volume">
          <div className="player-equalizer-preview">
            <span className={`bar ${isPlaying ? "bar--anim" : ""}`} />
            <span className={`bar ${isPlaying ? "bar--anim" : ""}`} />
            <span className={`bar ${isPlaying ? "bar--anim" : ""}`} />
            <span className={`bar ${isPlaying ? "bar--anim" : ""}`} />
          </div>

          <button
            type="button"
            className="ctrl-btn"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <SpeakerSlash size={19} />
            ) : (
              <SpeakerHigh size={19} />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            aria-label="Adjust Volume"
            style={{
              background: `linear-gradient(to right, var(--accent-current) ${
                (isMuted ? 0 : volume) * 100
              }%, rgba(255, 255, 255, 0.15) ${(isMuted ? 0 : volume) * 100}%)`,
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Player;

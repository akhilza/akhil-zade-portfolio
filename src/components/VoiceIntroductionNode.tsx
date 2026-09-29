"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, RotateCcw, MessageSquare, Mic } from "lucide-react";

/**
 * -------------------------------------------------------------
 * PLACE YOUR RECORDED AUDIO FILE HERE:
 * Put your recorded audio file into:
 *   public/intro.mp3 (or .wav / .m4a)
 * -------------------------------------------------------------
 */
const RECORDED_AUDIO_PATH = "/intro.mp3";

const INTRO_SCRIPT =
  `Hello and welcome! I'm Akhil Zade, a Full-Stack Developer with 5 years of total software engineering experience.
   I specialize in building fast, production-grade web applications using React, Next.js, TypeScript, Node.js, and Express,
  alongside enterprise backend services in Java and Spring Boot. 
  Throughout my career, I've developed scalable fitness dashboards with Stripe recurring billing, 
  high-traffic e-commerce storefronts on AWS, and automated QA tooling saving 60% engineering effort.
  Feel free to explore my live production projects, verified credentials, and get in touch. Thank you for visiting, and let's connect!`;

export function VoiceIntroductionNode() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Audio elements & speech synthesis refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Check if public/intro.mp3 exists and is playable
  useEffect(() => {
    const audio = new Audio();
    audio.src = RECORDED_AUDIO_PATH;
    audio.preload = "metadata";

    audio.oncanplay = () => {
      setHasRecordedAudio(true);
      setDuration(audio.duration || 0);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentTime(0);
    };

    audio.onerror = () => {
      // Audio file not added yet in public/intro.mp3 -> fallback to SpeechSynthesis
      setHasRecordedAudio(false);
    };

    audioRef.current = audio;

    // Also prepare speech synthesis as fallback
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const naturalVoice =
            voices.find(
              (v) =>
                v.lang.startsWith("en") &&
                (v.name.includes("Natural") ||
                  v.name.includes("Google") ||
                  v.name.includes("Neural") ||
                  v.name.includes("Daniel") ||
                  v.name.includes("Samantha") ||
                  v.name.includes("David"))
            ) ||
            voices.find((v) => v.lang.startsWith("en")) ||
            voices[0];
          setSelectedVoice(naturalVoice || null);
        }
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlay = () => {
    // 1. Try playing custom recorded audio if available
    if (hasRecordedAudio && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsPaused(false);
        })
        .catch(() => {
          // If autoplay blocked or error, fallback to speech synthesis
          fallbackSpeech();
        });
      return;
    }

    // 2. Fallback: Browser Web Speech Synthesis
    fallbackSpeech();
  };

  const fallbackSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(INTRO_SCRIPT);
    utteranceRef.current = utterance;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      if (e.error !== "canceled" && e.error !== "interrupted") {
        console.error("Speech error:", e);
      }
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (hasRecordedAudio && audioRef.current) {
      audioRef.current.pause();
    } else if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
    }
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (hasRecordedAudio && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleReplay = () => {
    handleStop();
    setTimeout(() => {
      handlePlay();
    }, 120);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto my-4 text-left transition-all">
      {/* Voice Node Interactive Badge */}
      <div
        className={`relative rounded-2xl border transition-all duration-300 p-3 sm:p-4 backdrop-blur-md ${isPlaying
            ? "border-[#00d4ff] bg-neutral-950/90 shadow-[0_0_25px_rgba(0,212,255,0.25)]"
            : "border-[#00d4ff]/30 bg-neutral-950/60 hover:border-[#00d4ff]/60"
          }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Animated Sound Icon & Status */}
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${isPlaying
                  ? "border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff] shadow-[0_0_12px_rgba(0,212,255,0.4)]"
                  : "border-white/10 bg-black text-[#00d4ff]"
                }`}
            >
              {isPlaying ? (
                /* Equalizer animated sound bars */
                <div className="flex items-end justify-center gap-0.5 h-4 w-4">
                  <span className="w-0.5 bg-[#00d4ff] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
                  <span className="w-0.5 bg-[#00d4ff] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s] h-4" />
                  <span className="w-0.5 bg-[#00d4ff] rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s] h-1.5" />
                  <span className="w-0.5 bg-[#00d4ff] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.1s] h-3.5" />
                </div>
              ) : hasRecordedAudio ? (
                <Mic className="h-4 w-4 text-[#00d4ff]" />
              ) : (
                <Volume2 className="h-4 w-4 text-[#00d4ff]" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00d4ff]">
                  {hasRecordedAudio ? "Akhil's Voice Intro" : "Live Voice Node"}
                </span>
                {isPlaying && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[9px] font-mono text-emerald-400 font-bold animate-pulse">
                    Playing
                  </span>
                )}
                {isPaused && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[9px] font-mono text-amber-300 font-bold">
                    Paused
                  </span>
                )}
                {hasRecordedAudio && (
                  <span className="text-[10px] font-mono text-white/50">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                )}
              </div>
              <p className="text-xs text-white/90 font-medium">
                {isPlaying
                  ? "Playing voice introduction of Akhil's experience..."
                  : isPaused
                    ? "Introduction paused. Click play to resume."
                    : hasRecordedAudio
                      ? "Listen to Akhil's personal voice recording"
                      : "Listen to 40-sec engineering introduction audio"}
              </p>
            </div>
          </div>

          {/* Right: Audio Control Buttons */}
          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#00d4ff]/60 bg-[#00d4ff]/10 hover:bg-[#00d4ff] hover:text-black text-[#00d4ff] text-xs font-bold transition-all shadow-sm active:scale-95 group"
                title="Play voice introduction"
                id="btn-play-voice-intro"
              >
                <Play className="h-3.5 w-3.5 fill-current transition-transform group-hover:scale-110" />
                <span>{isPaused ? "Resume" : "Play Voice"}</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-400/50 bg-amber-500/10 hover:bg-amber-400 hover:text-black text-amber-300 text-xs font-bold transition-all active:scale-95"
                title="Pause audio"
                id="btn-pause-voice-intro"
              >
                <Pause className="h-3.5 w-3.5 fill-current" />
                <span>Pause</span>
              </button>
            )}

            {(isPlaying || isPaused) && (
              <>
                <button
                  onClick={handleReplay}
                  className="p-2 rounded-xl border border-white/15 bg-black hover:bg-neutral-900 text-white/80 hover:text-[#00d4ff] transition-colors"
                  title="Replay from start"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleStop}
                  className="p-2 rounded-xl border border-white/15 bg-black hover:bg-neutral-900 text-white/80 hover:text-rose-400 transition-colors"
                  title="Stop audio"
                >
                  <VolumeX className="h-3.5 w-3.5" />
                </button>
              </>
            )}

            <button
              onClick={() => setShowCaptions(!showCaptions)}
              className={`p-2 rounded-xl border transition-colors ${showCaptions
                  ? "border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff]"
                  : "border-white/15 bg-black text-white/70 hover:text-white"
                }`}
              title={showCaptions ? "Hide script transcript" : "Read script transcript"}
            >
              <MessageSquare className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Expandable Live Script Transcript */}
        {showCaptions && (
          <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/80 leading-relaxed font-sans bg-black/50 p-3 rounded-xl border border-white/5 space-y-1 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#00d4ff]">
              <span>Audio Introduction Transcript:</span>
              <button
                onClick={() => setShowCaptions(false)}
                className="hover:underline text-white/50 hover:text-white"
              >
                Close
              </button>
            </div>
            <p className="italic text-white/90 font-mono text-[11px] leading-relaxed">
              &ldquo;{INTRO_SCRIPT}&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

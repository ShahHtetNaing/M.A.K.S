import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Square, VolumeX } from 'lucide-react';
import { speakArabic, stopSpeaking } from '../services/ttsService';

interface PronounceButtonProps {
  text: string;
  label?: string;
  className?: string;
  iconSize?: number;
  title?: string;
}

const PronounceButton: React.FC<PronounceButtonProps> = ({ text, label, className = '', iconSize = 14, title }) => {
  const [state, setState] = useState<'idle' | 'playing' | 'error'>('idle');
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (state !== 'error') return;
    const timer = setTimeout(() => mounted.current && setState('idle'), 2500);
    return () => clearTimeout(timer);
  }, [state]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state === 'playing') {
      stopSpeaking();
      return;
    }
    setState('playing');
    speakArabic(text)
      .then(() => mounted.current && setState('idle'))
      .catch(() => mounted.current && setState('error'));
  };

  const Icon = state === 'playing' ? Square : state === 'error' ? VolumeX : Volume2;
  const caption = label && (state === 'playing' ? 'Stop' : state === 'error' ? 'Audio unavailable' : label);

  return (
    <button
      type="button"
      onClick={handleClick}
      title={title ?? 'Listen to Arabic pronunciation'}
      aria-label={label ?? title ?? 'Listen to Arabic pronunciation'}
      className={className}
    >
      <Icon size={iconSize} className={state === 'playing' ? 'animate-pulse' : ''} />
      {caption && <span>{caption}</span>}
    </button>
  );
};

export default PronounceButton;

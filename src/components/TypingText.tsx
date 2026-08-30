import React, { useEffect, useState } from "react";

export interface TypingTextProps {
  phrases: string[];
  /** Typing speed in ms per character (default 65ms) */
  typingSpeed?: number;
  /** Backspace speed in ms per character (default 35ms) */
  deletingSpeed?: number;
  /** Pause time in ms when full phrase is typed (default 1800ms) */
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export const TypingText: React.FC<TypingTextProps> = ({
  phrases,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 1800,
  className = "",
  cursorClassName = "text-cyan-400 font-bold ml-0.5 animate-pulse",
}) => {
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (!phrases.length) return;

    const currentPhrase = phrases[phraseIndex % phrases.length];

    if (!isDeleting && text === currentPhrase) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentPhrase.substring(0, prev.length - 1)
          : currentPhrase.substring(0, prev.length + 1),
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    phraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span className={className}>
      <span>{text}</span>
      <span className={cursorClassName} aria-hidden="true">
        |
      </span>
    </span>
  );
};

export default TypingText;

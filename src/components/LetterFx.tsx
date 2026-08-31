import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const defaultCharset = [
  "X",
  "$",
  "@",
  "a",
  "H",
  "z",
  "o",
  "0",
  "y",
  "#",
  "?",
  "*",
  "0",
  "1",
  "+",
  "~",
  "!",
  "%",
  "^",
  "&",
  "<",
  ">",
  "/",
  "|",
  "=",
  ":",
  ";",
  "[",
  "]",
  "{",
  "}",
  "_",
  "§",
  "±",
  "µ",
  "¶",
  "•",
  "※",
  "∆",
  "∇",
  "≈",
  "≠",
  "≡",
  "✦",
  "✧",
  "⬡",
  "⬢",
  "◈",
  "◇",
  "█",
  "▓",
  "▒",
  "░",
  "λ",
  "Ω",
  "π",
  "Σ",
  "Ψ",
  "θ",
  "φ",
  "α",
  "β",
  "ｦ",
  "ｱ",
  "ｳ",
  "ｴ",
  "ｵ",
  "ｶ",
  "ｷ",
  "ｹ",
  "ｺ",
  "ｻ",
  "ｼ",
  "ｽ",
  "ｾ",
  "ｿ",
  "ﾀ",
  "ﾂ",
  "ﾃ",
  "ﾅ",
  "ﾊ",
  "ﾐ",
  "ﾑ",
  "ﾒ",
  "ﾓ",
  "ﾗ",
  "ﾘ",
  "ﾜ",
];

function getRandomCharacter(charset: string[]): string {
  const randomIndex = Math.floor(Math.random() * charset.length);
  return charset[randomIndex];
}

const speedSettings = {
  fast: {
    BASE_DELAY: 10,
    REVEAL_DELAY: 10,
    INITIAL_RANDOM_DURATION: 100,
  },
  medium: {
    BASE_DELAY: 30,
    REVEAL_DELAY: 30,
    INITIAL_RANDOM_DURATION: 300,
  },
  slow: {
    BASE_DELAY: 60,
    REVEAL_DELAY: 60,
    INITIAL_RANDOM_DURATION: 600,
  },
};

export type LetterFxProps = {
  /** Text content or string array to cycle through */
  children?: ReactNode | string[];
  /** Array of string items to cycle through sequentially on each trigger */
  words?: string[];
  /** Alias for words array */
  texts?: string[];
  trigger?: "hover" | "instant" | "custom" | "interval";
  /** Configurable interval in milliseconds to auto-trigger the scramble effect */
  triggerIntervalMs?: number;
  /** Alias for triggerIntervalMs (in milliseconds) */
  intervalMs?: number;
  speed?: "fast" | "medium" | "slow";
  charset?: string[];
  onTrigger?: (triggerFn: () => void) => void;
  className?: string;
  style?: React.CSSProperties;
};

const LetterFx = forwardRef<HTMLSpanElement, LetterFxProps>(
  (
    {
      children,
      words,
      texts,
      trigger = "hover",
      triggerIntervalMs,
      intervalMs,
      speed = "medium",
      charset = defaultCharset,
      onTrigger,
      className,
      style,
    },
    ref,
  ) => {
    // Resolve string list
    const itemsList: string[] = React.useMemo(() => {
      if (Array.isArray(words) && words.length > 0) return words;
      if (Array.isArray(texts) && texts.length > 0) return texts;
      if (Array.isArray(children)) {
        return children.filter((c): c is string => typeof c === "string");
      }
      if (typeof children === "string") return [children];
      return [];
    }, [words, texts, children]);

    const [text, setText] = useState<string>(itemsList[0] || "");
    const inProgressRef = useRef<boolean>(false);
    const currentIndexRef = useRef<number>(0);
    const itemsListRef = useRef<string[]>(itemsList);

    itemsListRef.current = itemsList;

    const activeInterval = triggerIntervalMs ?? intervalMs;

    // Scramble and reveal target text
    const triggerNext = useCallback(
      async (advance = true) => {
        if (inProgressRef.current || itemsListRef.current.length === 0) return;

        const list = itemsListRef.current;
        let targetIndex = currentIndexRef.current;

        if (advance && list.length > 1) {
          targetIndex = (currentIndexRef.current + 1) % list.length;
          currentIndexRef.current = targetIndex;
        }

        const targetText = list[targetIndex] || "";
        inProgressRef.current = true;

        const { BASE_DELAY, REVEAL_DELAY, INITIAL_RANDOM_DURATION } =
          speedSettings[speed];

        const generateRandomText = (len: number) =>
          Array.from({ length: len }, () => getRandomCharacter(charset)).join(
            "",
          );

        let randomizedText = generateRandomText(targetText.length);
        const endTime = Date.now() + INITIAL_RANDOM_DURATION;

        while (Date.now() < endTime) {
          setText(randomizedText);
          await new Promise((resolve) => setTimeout(resolve, BASE_DELAY));
          randomizedText = generateRandomText(targetText.length);
        }

        for (let i = 0; i < targetText.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, REVEAL_DELAY));
          setText(
            `${targetText.substring(0, i + 1)}${randomizedText.substring(i + 1)}`,
          );
        }

        setText(targetText);
        inProgressRef.current = false;
      },
      [speed, charset],
    );

    // Initial mount trigger
    useEffect(() => {
      if (itemsList.length > 0 && !text) {
        setText(itemsList[0]);
      }

      if (trigger === "instant" || trigger === "interval") {
        triggerNext(false);
      }
    }, [trigger, triggerNext, itemsList, text]);

    // Custom external trigger
    useEffect(() => {
      if (trigger === "custom" && onTrigger) {
        onTrigger(() => triggerNext(true));
      }
    }, [trigger, onTrigger, triggerNext]);

    // Configurable periodic trigger interval (cycles to next text one by one)
    useEffect(() => {
      const isIntervalMode =
        trigger === "interval" ||
        (typeof activeInterval === "number" && activeInterval > 0);
      if (!isIntervalMode) return;

      const intervalDuration =
        activeInterval && activeInterval > 0 ? activeInterval : 3500;

      const timer = setInterval(() => {
        triggerNext(true);
      }, intervalDuration);

      return () => clearInterval(timer);
    }, [trigger, activeInterval, triggerNext]);

    return (
      <span
        ref={ref}
        className={cn(className)}
        style={style}
        onMouseOver={
          trigger === "hover" || Boolean(activeInterval)
            ? () => triggerNext(true)
            : undefined
        }
      >
        {text || (typeof children === "string" ? children : "")}
      </span>
    );
  },
);

LetterFx.displayName = "LetterFx";

export { LetterFx };

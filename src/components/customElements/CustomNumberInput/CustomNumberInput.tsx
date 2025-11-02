import { useMemo, useRef, useEffect, useState } from "react";
import {
  getContrastTextColor,
  lightenColor,
  darkenColor,
} from "../../../utils/color";

export const CustomNumberInput = ({
  id,
  value,
  readOnly = false,
  onChange,
  color,
  fontFamily = '"Inter", sans-serif',
  fontSize = "1em",
}: {
  id?: string;
  value: number;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  color: string;
  fontFamily?: string;
  fontSize?: string;
}) => {
  const minimimInputWidth = 20;
  const textColor = getContrastTextColor(color);
  const lightenedColor = lightenColor(color);
  const darkenedColor = darkenColor(color);
  const [inputWidth, setInputWidth] = useState<number>(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate a stable, valid CSS ID if not provided
  const inputId = useMemo(
    () =>
      id ||
      `custom-number-input-${value}-${color.replace(/[^a-zA-Z0-9]/g, "-")}`,
    [id, value, color]
  );

  // Measure text width to set input width
  useEffect(() => {
    if (measureRef.current) {
      const width = measureRef.current.offsetWidth;
      // Add some padding to ensure the number fits comfortably
      setInputWidth(Math.max(width + 8, minimimInputWidth)); // Minimum width of 20px
    }
  }, [value, fontFamily, fontSize]);

  return (
    <>
      <style>{`
        #${inputId}::-webkit-inner-spin-button,
        #${inputId}::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        #${inputId} {
          -moz-appearance: textfield;
        }
        #${inputId}:focus {
          box-shadow: 0 0 0 2px ${darkenedColor};
          outline: none;
        }
      `}</style>
      <span
        ref={measureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre",
          fontFamily: fontFamily,
          fontWeight: 300,
          fontSize: fontSize,
        }}
      >
        {value}
      </span>
      <input
        ref={inputRef}
        id={inputId}
        type="number"
        value={value}
        readOnly={readOnly}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        style={{
          border: "none",
          background: lightenedColor,
          color: textColor,
          borderRadius: "4px",
          fontFamily: fontFamily,
          fontWeight: 300,
          fontSize: fontSize,
          width: inputWidth > 0 ? `${inputWidth}px` : "auto",
          minWidth: `${minimimInputWidth}px`,
        }}
      />
    </>
  );
};

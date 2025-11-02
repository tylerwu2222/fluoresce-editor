import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { getContrastTextColor, darkenColor } from "../../../utils/color";

// Using a custom dropdown component so that styles apply consistently to the dropdown options across all browsers.
export const CustomDropdown = ({
  options,
  selected,
  color,
  textColor,
  onSelect,
  readOnly,
  fontFamily = '"Inter", sans-serif',
  fontSize,
  showCaret = true,
  addOption = false,
  onAddOptionClick,
}: {
  options: string[];
  selected: string;
  color: string;
  textColor: string;
  onSelect: (value: string) => void;
  readOnly?: boolean;
  fontFamily?: string;
  fontSize?: string;
  showCaret?: boolean;
  addOption?: boolean;
  onAddOptionClick?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [computedFontSize, setComputedFontSize] = useState<string>("1em");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const focusedIndexRef = useRef(0);
  
  const darkenedColor = darkenColor(color);
  const buttonId = useMemo(
    () => `categorical-dropdown-button-${selected.replace(/[^a-zA-Z0-9]/g, '-')}-${color.replace(/[^a-zA-Z0-9]/g, '-')}`,
    [selected, color]
  );

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(triggerRef.current);
        setComputedFontSize(computedStyle.fontSize);
        setDropdownPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  const handleSelect = useCallback((value: string) => {
    setIsOpen(false);
    onSelect(value);
  }, [onSelect]);

  // Sync focusedIndex ref with state
  useEffect(() => {
    focusedIndexRef.current = focusedIndex;
  }, [focusedIndex]);

  useEffect(() => {
    if (!isOpen) {
      const selectedIdx = options.indexOf(selected);
      setFocusedIndex(selectedIdx >= 0 ? selectedIdx : 0);
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, options, selected]);

  // Keyboard navigation when dropdown is open
  useEffect(() => {
    if (!isOpen) return;

    // Initialize focused index when opening (use current value or selected)
    const selectedIndex = options.indexOf(selected);
    const initialIndex = selectedIndex >= 0 ? selectedIndex : 0;
    setFocusedIndex(initialIndex);
    focusedIndexRef.current = initialIndex;

    const totalOptions = options.length + (addOption ? 1 : 0);
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();
        setFocusedIndex((prev) => {
          const newIndex = (prev + 1) % totalOptions;
          focusedIndexRef.current = newIndex;
          return newIndex;
        });
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        event.stopPropagation();
        setFocusedIndex((prev) => {
          const newIndex = (prev - 1 + totalOptions) % totalOptions;
          focusedIndexRef.current = newIndex;
          return newIndex;
        });
      } else if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        const currentFocusedIndex = focusedIndexRef.current;
        if (addOption && currentFocusedIndex === options.length) {
          // Add option is focused
          if (onAddOptionClick) {
            setIsOpen(false);
            onAddOptionClick();
          }
        } else if (currentFocusedIndex < options.length) {
          // Regular option is focused
          const selectedOption = options[currentFocusedIndex];
          if (selectedOption) {
            handleSelect(selectedOption);
          }
        }
      } else if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(false);
        triggerRef.current?.focus();
      } else if (event.key === "Tab") {
        setIsOpen(false);
      }
    };
    
    // Use capture phase to intercept before Lexical
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isOpen, options, selected, handleSelect, addOption, onAddOptionClick]);

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [focusedIndex, isOpen]);

  if (readOnly) {
    return (
      <div
        style={{
          padding: "2px 6px",
          border: "none",
          background: color,
          color: textColor,
          borderRadius: "4px",
          display: "inline-block",
          fontFamily: fontFamily,
          fontWeight: 300,
          fontSize: fontSize,
        }}
      >
        {selected}
      </div>
    );
  }

  return (
    <>
      <style>{`
        #${buttonId}:focus {
          outline: 2px solid ${darkenedColor};
          outline-offset: 0;
        }
      `}</style>
      <button
        id={buttonId}
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onKeyDown={(e) => {
          if (!isOpen && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp")) {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }
        }}
        style={{
          padding: "2px 6px",
          border: "none",
          background: color,
          color: textColor,
          borderRadius: "4px",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          fontFamily: fontFamily,
          fontWeight: 300,
          fontSize: fontSize,
        }}
      >
        {selected}
        {showCaret && <span style={{ fontSize: "0.7em" }}>▼</span>}
      </button>
      {isOpen && dropdownPosition && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            background: color,
            border: `1px solid ${textColor}40`,
            borderRadius: "4px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
            minWidth: triggerRef.current?.offsetWidth || "auto",
            fontFamily: fontFamily,
            fontWeight: 300,
            fontSize: fontSize || computedFontSize,
          }}
        >
          {options.map((option, index) => {
            const isSelected = option === selected;
            const isFocused = index === focusedIndex;
            const highlightColor = getContrastTextColor(color) === "white" 
              ? "rgba(255, 255, 255, 0.2)" 
              : "rgba(0, 0, 0, 0.1)";
            const selectedColor = getContrastTextColor(color) === "white" 
              ? "rgba(255, 255, 255, 0.15)" 
              : "rgba(0, 0, 0, 0.1)";
            
            return (
              <div
                key={option}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(option);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onMouseEnter={() => {
                  setFocusedIndex(index);
                }}
                style={{
                  padding: "2px 6px",
                  color: textColor,
                  cursor: "pointer",
                  background: isFocused 
                    ? highlightColor 
                    : isSelected 
                      ? selectedColor 
                      : "transparent",
                }}
              >
                {option}
              </div>
            );
          })}
          {addOption && onAddOptionClick && (
            <div
              ref={(el) => {
                optionRefs.current[options.length] = el;
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
                onAddOptionClick();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onMouseEnter={() => {
                setFocusedIndex(options.length);
              }}
              style={{
                padding: "2px 6px",
                color: textColor,
                cursor: "pointer",
                background: focusedIndex === options.length
                  ? (getContrastTextColor(color) === "white" 
                      ? "rgba(255, 255, 255, 0.2)" 
                      : "rgba(0, 0, 0, 0.1)")
                  : "transparent",
              }}
            >
              + add
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
};


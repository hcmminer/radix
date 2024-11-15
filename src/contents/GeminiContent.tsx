import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import TranslatorPopup from "~components/TranslatorPopup";
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import "~base.css"



export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const GeminiContent = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleTextClick = (event: MouseEvent) => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text) {
      setSelectedText(text);
      setPosition({ x: event.pageX, y: event.pageY });

      // Gửi yêu cầu đến background script để gọi API dịch văn bản
      chrome.runtime.sendMessage(
        { type: "TRANSLATE_TEXT", text },
        (response) => {
          setTranslatedText(response.translatedText || "Không thể dịch được.");
        }
      );
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleTextClick);
    return () => document.removeEventListener("click", handleTextClick);
  }, []);

  if (!selectedText || !translatedText) return null;

  return <TranslatorPopup text={translatedText} position={position} />;
};

// Render component popup
const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<GeminiContent />);

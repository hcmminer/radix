import { useEffect, useState } from "react";
import TranslatorPopup from "~components/TranslatorPopup";
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import "~base.css"

export const config: PlasmoCSConfig = {
  matches: ["https://translate.google.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
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
          console.log("response: ", response);
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

export default PlasmoOverlay

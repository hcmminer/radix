import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import TranslatorPopup from "~components/TranslatorPopup";
import { useTranslationStore } from "~store/translationStore";

import cssText from "data-text:~style.css";
import type { PlasmoCSConfig } from "plasmo";

import "~base.css";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const GeminiContent = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sử dụng Zustand store
  const { getTranslation, addTranslation, clearExpiredCache } = useTranslationStore();

  const handleTextClick = (event: MouseEvent) => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text) {
      setSelectedText(text);
      setPosition({ x: event.pageX, y: event.pageY });

      // Kiểm tra cache bằng Zustand
      const cachedTranslation = getTranslation(text);
      if (cachedTranslation) {
        setTranslatedText(cachedTranslation); // Dùng cache nếu có
      } else {
        // Gọi API nếu không có trong cache
        chrome.runtime.sendMessage(
          { type: "TRANSLATE_TEXT", text },
          (response) => {
            const translated = response.translatedText || "Không thể dịch được.";
            addTranslation(text, translated); // Lưu vào cache
            setTranslatedText(translated);
          }
        );
      }
    }
  };

  useEffect(() => {
    // Xóa cache hết hạn mỗi 5 phút
    const interval = setInterval(() => {
      clearExpiredCache();
    }, 5 * 60 * 1000);

    // Lắng nghe sự kiện click
    document.addEventListener("click", handleTextClick);
    return () => {
      document.removeEventListener("click", handleTextClick);
      clearInterval(interval);
    };
  }, []);

  const closePopup = () => {
    setSelectedText(null);
    setTranslatedText(null);
  };

  if (!selectedText || !translatedText) return null;

  return (
    <>
      {/* Hiển thị TranslatorPopup */}
      <TranslatorPopup
        text={translatedText} // Bản dịch từ API
        position={position}
        onClose={closePopup}
      />
    </>
  );
};

// Render component popup
const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<GeminiContent />);

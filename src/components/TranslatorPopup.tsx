import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";

type TranslatorPopupProps = {
  text: string; // Nội dung bản dịch
  position: { x: number; y: number }; // Vị trí popup
  onClose: () => void; // Hàm đóng popup
};

const TranslatorPopup: React.FC<TranslatorPopupProps> = ({ text, position, onClose }) => {
  return (
    <Popover.Root open>
      {/* Vị trí anchor */}
      <Popover.Anchor
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          zIndex: 9999, // Đảm bảo luôn đứng trên
        }}
      />
      {/* Portal để đảm bảo popup nằm ở body */}
      <Popover.Portal>
        <Popover.Content
          className="PopoverContent"
          sideOffset={5}
          style={{
            position: "absolute",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            fontSize: "14px",
            zIndex: 99999, // Đặt giá trị cao hơn
            maxWidth: "200px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ marginBottom: "10px", color: "#333" }}>{text}</p>
          {/* Nút đóng */}
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              alignSelf: "flex-end",
              cursor: "pointer",
              fontSize: "14px",
              color: "#555",
            }}
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
          {/* Mũi tên chỉ anchor */}
          <Popover.Arrow style={{ fill: "white" }} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default TranslatorPopup;

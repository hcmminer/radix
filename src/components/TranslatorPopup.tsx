// components/TranslatorPopup.tsx
import React from "react";
import * as Popover from "@radix-ui/react-popover";

type TranslatorPopupProps = {
  text: string; // Nội dung cần hiển thị
  position: { x: number; y: number }; // Vị trí của popup (tọa độ x, y)
};

const TranslatorPopup: React.FC<TranslatorPopupProps> = ({ text, position }) => (
  <Popover.Root open={true}> {/* Luôn hiển thị popup */}
    {/* Popover.Anchor định vị vị trí dựa trên `x` và `y` */}
    <Popover.Anchor
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        zIndex: 9999,
      }}
    />
    {/* Nội dung hiển thị của popup */}
    <Popover.Content
      sideOffset={5} // Khoảng cách từ `Anchor` đến popup
      align="center" // Canh giữa theo chiều ngang
      style={{
        padding: "8px",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "200px",
        fontSize: "14px",
        zIndex: 9999,
      }}
    >
      {text} {/* Nội dung bản dịch */}
      <Popover.Arrow // Mũi tên hướng đến Anchor */}
        style={{ fill: "white" }}
      />
    </Popover.Content>
  </Popover.Root>
);

export default TranslatorPopup;

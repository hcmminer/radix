// components/TranslatorPopup.tsx
import React from "react";
import * as Popover from "@radix-ui/react-popover";

type TranslatorPopupProps = {
  text: string;
  position: { x: number; y: number };
};

const TranslatorPopup: React.FC<TranslatorPopupProps> = ({ text, position }) => (
  <Popover.Root>
    <Popover.Anchor style={{ position: "absolute", top: position.y, left: position.x, zIndex: 9999 }} />
    <Popover.Content
      sideOffset={5}
      style={{
        padding: "8px",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "200px",
        fontSize: "14px",
      }}
    >
      {text}
      <Popover.Arrow />
    </Popover.Content>
  </Popover.Root>
);

export default TranslatorPopup;

import { useState } from "react";

export const useInformationButtons = () => {
  const [openId, setOpenId] = useState<string | null>("types");

  const toggle = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return {
    openId,
    toggle,
  };
};

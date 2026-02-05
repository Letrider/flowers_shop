import { useState } from "react";

export const useInformationButtons = () => {
  const [openId, setOpenId] = useState<string>("types");

  const toggle = (id: string) => {
    if (openId === id) {
      setOpenId(id);
    } else {
      setOpenId(id);
    }
  };

  return {
    openId,
    toggle,
  };
};

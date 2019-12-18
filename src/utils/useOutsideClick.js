import { useState, useEffect } from "react";

export const useOutsideClick = nodeRef => {
  const [isOutside, setIsOutside] = useState(false);

  const handleOutsideClick = e => {
    if (nodeRef.current.contains(e.target)) {
      return setIsOutside(false);
    }
    return setIsOutside(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isOutside
  };
};

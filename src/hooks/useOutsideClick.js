import { useEffect, useRef } from "react";

export function useOutsideClick(handler, liseteningCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, liseteningCapturing);
      return () =>
        document.removeEventListener("click", handleClick, liseteningCapturing);
    },
    [handler, liseteningCapturing]
  );
  return ref;
}

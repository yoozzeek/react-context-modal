import { useMediaQuery } from "react-responsive";

export default function useGteSm() {
  return useMediaQuery({
    query: "(min-width: 576px)",
  });
}

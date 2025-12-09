import React from "react";
import { Box } from "../ui/box";
import { Spinner } from "../ui/spinner";

export default function LoadingState() {
  return (
    <Box className="flex-1 p-6 justify-center items-center">
      <Spinner size={"large"} />
    </Box>
  );
}

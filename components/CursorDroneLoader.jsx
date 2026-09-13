"use client";

import dynamic from "next/dynamic";
import SceneErrorBoundary from "./SceneErrorBoundary";

const CursorDrone = dynamic(() => import("./CursorDrone"), {
  ssr: false,
  loading: () => null,
});

export default function CursorDroneLoader() {
  return (
    <SceneErrorBoundary>
      <CursorDrone />
    </SceneErrorBoundary>
  );
}

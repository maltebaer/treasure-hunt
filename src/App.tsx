import { useState } from "react";
import MapScreen from "./screens/MapScreen";
import TreasureScreen from "./screens/TreasureScreen";
import { ProgressProvider, useProgress } from "./state/progress";

export default function App() {
  return (
    <ProgressProvider>
      <AppShell />
    </ProgressProvider>
  );
}

function AppShell() {
  const { solvedStations } = useProgress();
  const [viewingMap, setViewingMap] = useState(false);

  const allSolved = solvedStations.length === 7;

  if (allSolved && !viewingMap) {
    return <TreasureScreen onViewMap={() => setViewingMap(true)} />;
  }
  return <MapScreen />;
}

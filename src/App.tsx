import { useState } from "react";
import MapScreen from "./screens/MapScreen";
import TreasureScreen from "./screens/TreasureScreen";
import { ProgressProvider, useProgress } from "./state/progress";
import { STATIONS } from "./data/stations";

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

  const allSolved = solvedStations.length === STATIONS.length;

  if (allSolved && !viewingMap) {
    return <TreasureScreen onViewMap={() => setViewingMap(true)} />;
  }
  return <MapScreen />;
}

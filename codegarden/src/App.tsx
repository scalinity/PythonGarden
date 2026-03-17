import { Routes, Route } from 'react-router'
import { MainMenu } from './pages/MainMenu/MainMenu.tsx'
import { LevelSelect } from './pages/LevelSelect/LevelSelect.tsx'
import { GameView } from './pages/GameView/GameView.tsx'
import { Settings } from './pages/Settings/Settings.tsx'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/levels" element={<LevelSelect />} />
      <Route path="/play/:id" element={<GameView />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

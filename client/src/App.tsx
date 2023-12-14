import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import GamesContainer from './Components/GamesContainer'
import { useState } from 'react'
import ProtectedComponent from './Components/ProtectedComponent'

const games = [
  {
    id: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    description: "An action-adventure game set in a vast open-world environment.",
    imageUrl: "https://example.com/image/zelda.jpg"
  },
  {
    id: 2,
    title: "Super Mario Odyssey",
    description: "A platform adventure game featuring Mario in a massive sandbox-style world.",
    imageUrl: "https://example.com/image/mario.jpg"
  },
  {
    id: 3,
    title: "Minecraft",
    description: "A sandbox game where players can build, mine, battle, and explore in an infinite world.",
    imageUrl: "https://example.com/image/minecraft.jpg"
  },
  {
    id: 4,
    title: "Fortnite",
    description: "A battle royale game where players fight to be the last one standing.",
    imageUrl: "https://example.com/image/fortnite.jpg"
  },
  {
    id: 5,
    title: "Animal Crossing: New Horizons",
    description: "A social simulation game where players can create and manage their own island paradise.",
    imageUrl: "https://example.com/image/animalcrossing.jpg"
  },
  {
    id: 6,
    title: "Among Us",
    description: "A multiplayer game where players work together on a spaceship but some are impostors bent on sabotage.",
    imageUrl: "https://example.com/image/amongus.jpg"
  }
];

function App() {

  const [token, setToken] = useState()

  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedComponent />}>
          <Route index element={<GamesContainer games={games} token={token} />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

      </Routes>
    </>
  )
}

export default App

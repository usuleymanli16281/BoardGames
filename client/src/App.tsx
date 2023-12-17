import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { MainContext } from './context'
import { GamesContainer, Layout, Login, Register } from './Components';
const games = [
  {
    "id": 1,
    "title": "TicTacToe",
    "description": "A fast-paced word game where players race against each other to build a word grid.",
    "imageUrl": "https://img.freepik.com/premium-vector/vector-abstract-tictactoe_721813-301.jpg",
  },
  {
    "id": 2,
    "title": "Jenga",
    "description": "A game of physical skill involving removing blocks from a tower and balancing them on top.",
    "imageUrl": "https://pics.walgreens.com/prodimg/635315/450.jpg"
  },
  {
    "id": 3,
    "title": "Telestrations",
    "description": "A fun drawing and guessing game where players illustrate words and phrases.",
    "imageUrl": "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81DomMVWl+L._AC_UF894,1000_QL80_.jpg"
  },
  {
    "id": 4,
    "title": "Othello",
    "description": "A strategy board game played between two players, aiming to have the majority of disks on the board in their color.",
    "imageUrl": "https://m.media-amazon.com/images/I/71YiFFzJvDL._AC_UF894,1000_QL80_.jpg"
  },
  {
    "id": 5,
    "title": "Charades",
    "description": "A classic party game of acting out words or phrases for others to guess.",
    "imageUrl": "https://i1.sndcdn.com/avatars-000057531948-l5j1se-t500x500.jpg"
  },
  // Add more games as needed
]


function App() {

  const [token, setToken] = useState()

  return (
    <>
      <MainContext.Provider value={{ setToken }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<GamesContainer games={games} />} />
          </Route>
          {/* <Route path='/' element={<ProtectedComponent />}></Route> */}
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </MainContext.Provider>
    </>
  )
}

export default App

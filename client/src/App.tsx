import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { MainContext } from "./context";
import {
  GamesContainer,
  Layout,
  Login,
  ProtectedComponent,
  Register,
} from "./Components";
import { jwtDecode } from "jwt-decode";
import GameInterface from "./Components/Games/GameInterface";
import TicTacToe from "./Components/Games/TicTacToe";
const games = [
  {
    id: 1,
    title: "TicTacToe",
    description:
      "A fast-paced word game where players race against each other to build a word grid.",
    imageUrl:
      "https://img.freepik.com/premium-vector/vector-abstract-tictactoe_721813-301.jpg",
  },
  {
    id: 2,
    title: "Jenga",
    description:
      "A game of physical skill involving removing blocks from a tower and balancing them on top.",
    imageUrl: "https://pics.walgreens.com/prodimg/635315/450.jpg",
  },
  {
    id: 3,
    title: "Telestrations",
    description:
      "A fun drawing and guessing game where players illustrate words and phrases.",
    imageUrl:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81DomMVWl+L._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 4,
    title: "Othello",
    description:
      "A strategy board game played between two players, aiming to have the majority of disks on the board in their color.",
    imageUrl:
      "https://m.media-amazon.com/images/I/71YiFFzJvDL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 5,
    title: "Charades",
    description:
      "A classic party game of acting out words or phrases for others to guess.",
    imageUrl: "https://i1.sndcdn.com/avatars-000057531948-l5j1se-t500x500.jpg",
  },
  // Add more games as needed
];

function App() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token as string) as {
        unique_name: string;
      };

      setName(decodedToken.unique_name);
    }
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem("token") as string);
  }, []);

  return (
    <>
      <MainContext.Provider value={{ setToken, token, setUserInfo, name }}>
        <Routes>
          <Route path="/" element={<ProtectedComponent />}>
            <Route path="" element={<Layout />}>
              <Route index element={<GamesContainer games={games} />} />
              <Route path="games" element={<GameInterface/>}>
                <Route path="tictactoe" element={<TicTacToe boardScale={2} />}/>
              </Route>
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </MainContext.Provider>
    </>
  );
}

export default App;

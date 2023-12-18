import { useState } from "react";

interface TicTacToeProps {
  boardScale?: number;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ boardScale = 1 }) => {
  const [gameState, setGameState] = useState<string>("game");
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [arr, setArr] = useState<string[]>(Array(9).fill(""));
  const [winArr, setWinArr] = useState<number[]>([]);

  const winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (i: number) => {
    if (gameState !== "game" || arr[i] !== "") return;

    const tempArr = [...arr];
    tempArr[i] = turn;
    setArr(tempArr);

    for (let j = 0; j < winCases.length; j++) {
      if (
        tempArr[winCases[j][0]] &&
        tempArr[winCases[j][0]] === tempArr[winCases[j][1]] &&
        tempArr[winCases[j][1]] === tempArr[winCases[j][2]]
      ) {
        setWinArr(winCases[j]);
        setGameState("finished");
        return;
      }
    }

    setTurn(turn === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setArr(Array(9).fill(""));
    setGameState("game");
    setWinArr([]);
    setTurn("X");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-[15px] select-none" style={{ transform: `scale(${boardScale})` }}>
        {gameState === "game" ? (
          <div className="font-bold">Turn : {turn}</div>
        ) : (
          <div className="font-bold flex items-center gap-[10px]">
            Winner: <span className="text-[1.4em]">{arr[winArr[0]]}</span>
          </div>
        )}
        <div className="w-[200px] h-[200px] grid grid-cols-3">
          {arr.map((e, i) => (
            <div
              key={`block${i}`}
              className={`w-full border-gray-700 border-4 ${
                gameState === "game"
                  ? "lg:hover:bg-gray-400 lg:hover:scale-[1.3] active:scale-[1] active:bg-gray-500"
                  : "bg-gray-400"
              } ${winArr.includes(i) ? "bg-green-400" : ""} flex justify-center items-center`}
              onClick={() => handleClick(i)}
            >
              <span className="absolute font-bold">{e}</span>
            </div>
          ))}
        </div>
        <button
          className={`py-2 px-4 border-gray-700 border-4 lg:hover:bg-gray-400 lg:hover:scale-[1.3] active:scale-[1] active:bg-gray-500 ${
            gameState === "finished" ? "scale-[1.3]" : ""
          }`}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default TicTacToe;

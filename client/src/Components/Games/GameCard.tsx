import React from 'react';
import { NavLink } from 'react-router-dom';

export interface Game {
  id: number,
  title: string,
  description:string,
  imageUrl: string
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <NavLink to={"games/"+game.title.toLowerCase()}>
    <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={game.imageUrl} alt={game.title} />
      <div className="p-5">
        <h5 className="text-gray-900 dark:text-white text-xl font-medium mb-2">{game.title}</h5>
        <p className="text-gray-700 dark:text-gray-400 text-base mb-4">
          {game.description}
        </p>
      </div>
    </div>
    </NavLink>
  );
};

export default GameCard;

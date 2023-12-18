import React from 'react';
import GameCard, {Game} from './GameCard';
import { useEffect } from 'react';
interface GamesContainerProps {
  games: Game[];
}

const GamesContainer: React.FC<GamesContainerProps> = ({ games }) => {

  
  return (
    <div className="container mx-auto px-4 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GamesContainer;

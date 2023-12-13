import { useEffect } from 'react';
import GameCard from './GameCard';

export default function GamesContainer({ games, token }: any) {

    useEffect(()=>{
        if(!token) window.location.href = "login"
    },[])

    return (
        <div className="game-list">
            {games.map((game: any) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
}


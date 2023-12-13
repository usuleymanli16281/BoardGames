
export default function GameCard({ game }) {
  return (
    <div className="game-card">
      <img src={game.imageUrl} alt={game.title} className="game-image" />
      <h3>{game.title}</h3>
      <p>{game.description}</p>
    </div>
  );
}
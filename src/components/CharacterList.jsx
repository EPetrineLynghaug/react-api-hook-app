import { Link } from 'react-router';
import useFetch from '../hooks/useFetch';

const CharacterList = () => {
  // Rick and Morty API endpoint for characters
  const { data, loading, error } = useFetch('https://rickandmortyapi.com/api/character');

  if (loading) return <p>Loading characters...</p>;
  if (error) return <p>Error fetching characters: {error.message}</p>;

  return (
    <>
      <h2>Characters</h2>
      <ul>
        {data.results.map((character) => (
          <li key={character.id}>
            {/* Link to the details page using dynamic routing */}
            <Link to={`/character/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CharacterList;
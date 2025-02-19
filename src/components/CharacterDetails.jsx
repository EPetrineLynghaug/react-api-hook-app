import { useEffect } from 'react';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';

const CharacterDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`https://rickandmortyapi.com/api/character/${id}`);
  const [lastViewed, setLastViewed] = useLocalStorage('lastViewedCharacter', null);

  useEffect(() => {
    if (data) {
      setLastViewed(data);
    }
  }, [data, setLastViewed]);

  if (loading) return <p>Loading character details...</p>;
  if (error) return <p>Error fetching details: {error.message}</p>;

  return (
    <>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
      <p>Origin: {data.origin.name}</p>
    </>
  );
};

export default CharacterDetails;
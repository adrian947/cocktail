import { useMemo } from 'react';
import CocktailCard from '../components/CocktailCard';
import { useAppStore } from '../stores/useAppStore';

const FavoritesPage = () => {
  const { favorites } = useAppStore((state) => state);
  const hasCocktails = useMemo(() => favorites.length, [favorites]);
  return (
    <div>
      <h1 className='text-6xl font-extrabold text-center'>Favorites</h1>

      {hasCocktails ? (
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10'>
          {favorites.map((cocktail) => (
            <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
          ))}
        </div>
      ) : (
        <p className='my-10 text-center text-2xl uppercase'>
          no favorites available
        </p>
      )}
    </div>
  );
};

export default FavoritesPage;

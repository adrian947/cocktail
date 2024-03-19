import { useMemo } from 'react';
import { useAppStore } from '../stores/useAppStore';
import CocktailCard from '../components/CocktailCard';

const IndexPage = () => {
  const cocktails = useAppStore((state) => state.cocktails);

  const hasCocktails = useMemo(() => cocktails.drinks.length, [cocktails]);
  return (
    <>
      <h1 className='text-6xl font-extrabold text-center'>Recipes</h1>

      {hasCocktails ? (
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10'>
         { cocktails.drinks.map((cocktail) => (
            <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
          ))}

        </div>
      ) : (
        <p className='my-10 text-center text-2xl uppercase'>
          no drinks available
        </p>
      )}
    </>
  );
};

export default IndexPage;

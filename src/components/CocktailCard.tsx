import { useAppStore } from '../stores/useAppStore';
import { Cocktail } from '../types';

type ICocktail = {
  cocktail: Cocktail;
};

const CocktailCard = ({ cocktail }: ICocktail) => {
  const selectRecipe = useAppStore((state) => state.selectRecipe);

  return (
    <div className='border shadow-lg rounded-xl'>
      <div className='overflow-hidden rounded-xl'>
        <img
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          className='hover:scale-125 transition-transform hover:rotate-2'
        />
      </div>
      <div className='p-5'>
        <h2 className='text-2xl truncate font-black'>{cocktail.strDrink}</h2>
        <button
          className='bg-orange-400 hover:bg-orange-500 mt- w-full p-3 font-bold text-white text-lg rounded-xl'
          onClick={() => selectRecipe(cocktail.idDrink)}
        >
          SEE RECIPE
        </button>
      </div>
    </div>
  );
};

export default CocktailCard;

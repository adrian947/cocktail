import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from '../stores/useAppStore';

export const Header = () => {
  const { pathname } = useLocation();

  const { fetchCategories, searchRecipes } = useAppStore((state) => state);
  const { drinks } = useAppStore((state) => state.categories);

  const [isSearchForIngredient, setIsSearchForIngredient] = useState(false);

  const [searchRecipe, setSearchRecipe] = useState('');

  const isHome = useMemo(() => pathname === '/', [pathname]);
  const disabled = useMemo(() => !searchRecipe, [searchRecipe]);

  useEffect(() => {    
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    searchRecipes( { ingredient: 'tequila' });
  }, [searchRecipes]);

  useEffect(() => {
    setSearchRecipe('');
  }, [isSearchForIngredient]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchRecipe(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let objectParam;
    if (isSearchForIngredient) {
      objectParam = { ingredient: searchRecipe };
    } else {
      objectParam = { category: searchRecipe };
    }

    searchRecipes(objectParam);
  };

  return (
    <header
      className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}
    >
      <div className='mx-auto container px-5 py-16'>
        <div className='flex justify-between items-center'>
          <div>
            <img className='w-32' src='/logo.svg' alt='logo' />
          </div>
          <nav className='flex gap-4'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? 'text-orange-500 font-bold' : 'text-white font-bold'
              }
            >
              HOME
            </NavLink>
            <NavLink
              to='/favorites'
              className={({ isActive }) =>
                isActive ? 'text-orange-500 font-bold' : 'text-white font-bold'
              }
            >
              FAVORITES
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            className='md:w-1/2 2xl:w1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6'
            onSubmit={handleSubmit}
          >
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                checked={isSearchForIngredient}
                className='sr-only peer'
                onChange={(e) => setIsSearchForIngredient(e.target.checked)}
              />
              <div className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-800"></div>
              <span className='ms-3 text-sm font-medium text-white'>
                {isSearchForIngredient
                  ? 'Search for ingredient'
                  : 'Search for category'}
              </span>
            </label>

            {isSearchForIngredient ? (
              <div className='space-y-4'>
                <label
                  htmlFor='ingredient'
                  className='block text-white uppercase font-extrabold text-lg'
                >
                  Name or ingredient
                </label>
                <input
                  id='ingredient'
                  type='text'
                  name='ingredient'
                  className='p-3 w-full rounded-lg focus:outline-none'
                  placeholder='Example: Vodka, Tequila, Coffee'
                  onChange={handleChange}
                  value={searchRecipe}
                />
              </div>
            ) : (
              <div className='space-y-4'>
                <label
                  htmlFor='category'
                  className='block text-white uppercase font-extrabold text-lg'
                >
                  category
                </label>
                <select
                  id='category'
                  name='category'
                  className='p-3 w-full rounded-lg focus:outline-none'
                  onChange={handleChange}
                  value={searchRecipe}
                >
                  <option value='' disabled>Change Category</option>
                  {drinks.map((category) => (
                    <option
                      key={category.strCategory}
                      value={category.strCategory}
                    >
                      {category.strCategory}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <input
              type='submit'
              value='search cocktail'
              className={`cursor-pointer font-extrabold w-full p-2 rounded-lg uppercase ${
                disabled
                  ? 'bg-gray-600 text-gray-400'
                  : 'bg-orange-800 hover:bg-orange-900 text-white'
              }`}
              disabled={disabled}
            />
          </form>
        )}
      </div>
    </header>
  );
};

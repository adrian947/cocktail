import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useMemo } from 'react';
import { useAppStore } from '../stores/useAppStore';

export default function Modal() {
  const { modal, closeModal, recipe, handeleAddFavorites, favoriteExists } =
    useAppStore((state) => state);

  const recipeDrink = useMemo(() => recipe.drinks[0], [recipe]);

  if (!recipeDrink) return;

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = [];
    for (let index = 1; index <= 6; index++) {
      const ingredient =
        recipeDrink[`strIngredient${index}` as keyof typeof recipeDrink];
      const measure =
        recipeDrink[`strMeasure${index}` as keyof typeof recipeDrink];
      if (ingredients && measure) {
        ingredients.push(
          <li key={index} className='text-lg font-normal'>
            {ingredient} - {measure}
          </li>
        );
      }
    }

    return ingredients;
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => {
            closeModal();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-70' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6'>
                  <Dialog.Title
                    as='h3'
                    className='text-gray-900 text-4xl font-extrabold my-5 text-center'
                  >
                    {recipeDrink?.strDrink}
                  </Dialog.Title>
                  <img
                    className='w-80 mx-auto rounded-lg'
                    src={recipeDrink?.strDrinkThumb}
                    alt={recipeDrink?.strDrink}
                  />
                  <Dialog.Title
                    as='h3'
                    className='text-gray-900 text-2xl font-extrabold my-5'
                  >
                    Ingredients
                  </Dialog.Title>
                  {renderIngredients()}
                  <Dialog.Title
                    as='h3'
                    className='text-gray-900 text-2xl font-extrabold my-5'
                  >
                    Instructions:
                  </Dialog.Title>
                  <p className='text-lg'>{recipeDrink?.strInstructions}</p>
                  <div className='mt-5 flex justify-between gap-2'>
                    <button
                      onClick={closeModal}
                      className='w-full rounded-lg bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500'
                    >
                      close
                    </button>
                    <button
                      className='w-full rounded-lg bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500'
                      onClick={() => {
                        handeleAddFavorites(recipeDrink);
                        closeModal();
                      }}
                    >
                      {favoriteExists(recipeDrink.idDrink)
                        ? 'delete favorites'
                        : 'add favorites'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

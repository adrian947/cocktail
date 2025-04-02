import { useState } from 'react';
import { useAppStore } from '../stores/useAppStore';

export default function GenerateAI() {
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const { iaRecipe, isLoading, generateRecipe } = useAppStore((state) => state);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('dasda');

    const form = new FormData(e.currentTarget);
    const prompt = form.get('prompt') as string;

    if (prompt.trim() === '') {
      return setShowNotification('The field is empty');
    }
    setShowNotification(null);
    await generateRecipe(prompt);
  };

  return (
    <>
      <h1 className='text-6xl font-extrabold'>Generate recipe with IA</h1>

      <div className='max-w-4xl mx-auto'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-3 py-10'>
          <div className='relative'>
            <input
              name='prompt'
              id='prompt'
              className='border bg-white p-4 rounded-lg w-full border-slate-800'
              placeholder='Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa'
            />
            <button
              type='submit'
              aria-label='Enviar'
              className={`
					absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2
					w-12 h-12 flex items-center justify-center rounded-full
					transition-colors duration-300
					${
					isLoading
						? 'bg-gray-400 cursor-not-allowed' // Color gris cuando está deshabilitado
						: 'bg-orange-500 hover:bg-orange-700 active:bg-blue-800 text-white'
					}
				`}
              disabled={isLoading}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
            </button>
          </div>
        </form>

        <div className='py-10 whitespace-pre-wrap'>{iaRecipe}</div>
      </div>
      <p className='text-red-600'>{showNotification}</p>
    </>
  );
}

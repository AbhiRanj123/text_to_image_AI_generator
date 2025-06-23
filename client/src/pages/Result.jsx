import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../contexts/AppContext'
import { motion } from 'motion/react'

const Result = () => {

  const {image,setImage,isImageLoaded,setIsImageLoaded,isLoading,setIsLoading,input,setInput,generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput('');
    setIsLoading(true);

    if(input){
      const image = await generateImage(input);
      if(image){
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setIsLoading(false);
  }

  return (
    <motion.form 
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      className='flex flex-col items-center justify-center min-h-[90vh]'>
      <div>
        {/* Display the image box and loading bar */}
        <div className='relative border border-gray-500 rounded'>
              <img
                src={image}
                className='max-w-sm rounded' // Hide the image during loading
                alt=""
              />
              <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${isLoading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
        </div>
        <p className={`items-center justify-center flex mt-5 ${isLoading ? '' : 'hidden'}`}>Loading...</p>
      </div>
      

      {isImageLoaded &&
        <div className='flex gap-4 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p
            onClick={() => {
              setIsImageLoaded(false);
              setImage(assets.sample_img_1);
            }}
            className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'
          >
            Generate more
          </p>
          <a
            href={image}
            download
            className='bg-zinc-900 p-10 py-3 rounded-full cursor-pointer'
          >
            Download
          </a>
        </div>}
      { !isImageLoaded && 
        <div className='flex max-w-xl w-full bg-neutral-500 text-white rounded-full text-sm p-1 mt-10'>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type='text'
            placeholder='Describe what you want to generate'
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-content'
          />
          <button
            onClick={onSubmitHandler}
            type='button'
            className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'
          >
            Generate
          </button>
        </div>
      }
    </motion.form>
  )
}

export default Result

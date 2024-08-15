import React from 'react';

const Card = (props) => {
  const { offer, image, title, rating, minTime, maxTime, name, place } = props.data;

  return (
    <div className='p-4 bg-white shadow-md shrink-0 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer transform transition-transform duration-600 hover:scale-[0.98]'>
      <div className='relative w-[250px] h-40 mb-3 overflow-hidden'>
        <img 
          src={`http://localhost:5000/images/${image}`} 
          alt={title} 
          className="w-full h-full object-cover rounded-md"
        />
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white font-extrabold'>
          {offer.toUpperCase()}
        </div>
      </div>
      <h1 className='text-lg font-semibold text-gray-800 mb-1'>{title}</h1>
      <p className='text-sm text-gray-600 mb-1'>
        <span className='font-medium'>{rating}</span> • {minTime} - {maxTime} mins
      </p>
      <p className='text-sm text-gray-500 mb-1'>{name}</p>
      <p className='text-sm text-gray-500'>{place}</p>
    </div>
  );
};

export default Card;

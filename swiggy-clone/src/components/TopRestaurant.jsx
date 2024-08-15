import React, { useState, useEffect, useRef } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Card from './Card';

const TopRestaurant = () => {
  const [categories, setCategories] = useState([]);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(0);

  const fetchCategory = async () => {
    try {
      const res = await fetch('http://localhost:5000/top-restaurant-chains');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const calculateVisibleItems = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const itemWidth = 250 + 16; // Item width + gap
      setVisibleItems(Math.floor(containerWidth / itemWidth));
    }
  };

  useEffect(() => {
    fetchCategory();
    calculateVisibleItems();
    window.addEventListener('resize', calculateVisibleItems);
    return () => window.removeEventListener('resize', calculateVisibleItems);
  }, []);

  const moveForward = () => {
    const maxOffset = -(categories.length - visibleItems) * (250 + 16);
    if (offset > maxOffset) {
      setOffset((prevOffset) => Math.max(prevOffset - (250 + 16), maxOffset));
    }
  };

  const moveBackward = () => {
    if (offset < 0) {
      setOffset((prevOffset) => Math.min(prevOffset + (250 + 16), 0));
    }
  };

  return (
    <section className='w-full mt-2'>
      <div className="max-w-[1080px] mx-auto p-4 overflow-x-hidden">
        <div className='flex items-center justify-between'>
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold mt-5'>
  Top restaurant chains in Raipur
</h1>

          <div className='flex gap-3 mt-4'>
            <button
              className="rounded-sm bg-slate-100 hover:bg-slate-300 p-2"
              onClick={moveBackward}
              disabled={offset === 0}
            >
              <BiLeftArrowAlt size={24} />
            </button>
            <button
              className="rounded-sm bg-slate-100 hover:bg-slate-300 p-2"
              onClick={moveForward}
              disabled={
                offset <= -(categories.length - visibleItems) * (250 + 16) ||
                categories.length <= visibleItems
              }
            >
              <BiRightArrowAlt size={24} />
            </button>
          </div>
        </div>

        {categories.length > 0 ? (
          <div
            ref={containerRef}
            className='flex gap-1 mt-5 transform transition-transform duration-300'
            style={{ transform: `translateX(${offset}px)` }}
          >
            {categories.map((data, index) => (
              <Card key={index} data={data} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No restaurants found.</p>
        )}
      </div>
    </section>
  );
};

export default TopRestaurant;

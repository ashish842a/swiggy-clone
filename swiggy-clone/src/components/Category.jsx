import React, { useState, useEffect, useRef } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(0);

  const fetchCategory = async () => {
    try {
      const res = await fetch('http://localhost:5000/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const calculateVisibleItems = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const itemWidth = 120 + 16; // Item width + gap
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
    const maxOffset = -(categories.length - visibleItems) * (120 + 16);
    if (offset > maxOffset) {
      setOffset((prevOffset) => prevOffset - (120 + 16));
    }
  };

  const moveBackward = () => {
    if (offset < 0) {
      setOffset((prevOffset) => prevOffset + (120 + 16));
    }
  };

  return (
    <section className='w-full '>
      <div className="max-w-[1080px] mx-auto p-4 overflow-x-hidden">
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold mt-5'>What's on your mind?</h1>
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
              disabled={offset <= -(categories.length - visibleItems) * (120 + 16)}
            >
              <BiRightArrowAlt size={24} />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className='flex gap-4 mt-5 transform transition-transform duration-300'
          style={{ transform: `translateX(${offset}px)` }}
        >
          {categories.map((category, index) => (
            <div key={index} className='shrink-0 w-[120px] h-[120px]'>
              <img 
                src={`http://localhost:5000/images/${category.image}`} 
                alt={category.path} 
                className="w-full h-full object-cover rounded-sm mb-2"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;

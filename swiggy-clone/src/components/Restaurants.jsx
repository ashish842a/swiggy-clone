import React, { useEffect, useState } from 'react';
import Card from './Card';

const Restaurants = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    try {
      const res = await fetch('http://localhost:5000/top-restaurant-chains');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section className='w-full'>
      <div className='max-w-[1080px] mx-auto px-4'>
        <div>
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold mt-5'>
  Restaurants with online food delivery in Raipur
</h1>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5'>
  {categories.length > 0 ? (
    categories.map((data, index) => (
      <Card key={index} data={data} />
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500">No restaurants found.</p>
  )}
</div>

      </div>
    </section>
  );
};

export default Restaurants;

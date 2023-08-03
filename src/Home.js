import React, { useEffect, useState } from 'react';

function Home() {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    fetch('https://biziaapi.onrender.com/products')
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Error fetching data');
        }
        return resp.json();
      })
      .then(data => {
        const lowStockProducts = data.filter(product => product.quantity < 30);
        setLowStockItems(lowStockProducts);
      })
      .catch(error => console.error('Error fetching data', error));
  }, []);

  return (
    <div>
      <div>
      <h1 className='font-bold text-[2rem] mb-[2.5rem]'>Hi, Atieno Auma Achola</h1>
      <div className=''>
        <img className='h-[50vh] ' src='https://images.unsplash.com/photo-1530785602389-07594beb8b73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' alt='atieno'></img>
      </div>
      <h2 className='font-medium mt-[1rem] mb-[1rem]'>Welcome back to your inventory system.</h2>
      <p className='font-medium mb-[1rem]'>Bizi-Track helps you take charge of your business and keep track of your stocks.</p>
      <p>Our CEO and Managing Director of Bizi-App,<strong> Eg. Prince W.O Hope </strong>, thanks you for choosing the #1 app in managing stock systems.</p>
      </div>

      {lowStockItems.length > 0 && (
        <div className="mt-4">
          <h3 className="text-red-500">Low Stock Items:</h3>
          <ul className="list-disc ml-6">
            {lowStockItems.map(item => (
              <li key={item.id}>
                Product {item.productid} - {item.productname} is below the required quantity, restock!
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Home;
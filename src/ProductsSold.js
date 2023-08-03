import React, { useEffect, useState } from 'react';

function ProductSold() {
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    fetch('https://biziaapi.onrender.com/soldItems')
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Error fetching data');
        }
        return resp.json();
      })
      .then((data) => {
        if (!data || !Array.isArray(data)) {
          throw new Error('Wrong format');
        }
        setSoldItems(data);
      })
      .catch((error) => console.error('Error fetching data', error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Products Sold</h2>
      <p>Below is a list of products sold today</p>
      {soldItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {soldItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <p className="text-lg font-semibold">{item.productname}</p>
              <p>
                <strong>Product ID:</strong> {item.productid}
                <br />
                <strong>Quantity Sold:</strong> {item.quantity}
                <br />
                <strong>Amount:</strong> {item.amount}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500">No products have been sold yet.</p>
      )}
    </div>
  );
}

export default ProductSold;
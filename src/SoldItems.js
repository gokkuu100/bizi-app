import React, { useState } from 'react';

function SoldItems() {
  const [productId, setProductId] = useState('');
  const [quantitySold, setQuantitySold] = useState('');
  const [message, setMessage] = useState('');

  const handleProductIdChange = (event) => {
    setProductId(event.target.value);
  };

  const handleQuantitySoldChange = (event) => {
    setQuantitySold(event.target.value);
  };

  const handleSellItem = () => {
    // Convert quantitySold to a number
    const quantity = parseInt(quantitySold, 10);

    if (isNaN(quantity) || quantity <= 0) {
      setMessage('Please enter a valid quantity.');
      return;
    }

    fetch(`https://biziaapi.onrender.com/products/${productId}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Error fetching data');
        }
        return resp.json();
      })
      .then((data) => {
        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
          throw new Error(`Product with id ${productId} not found.`);
        }

        // Check if there is sufficient quantity 
        if (data.quantity < quantity) {
          setMessage('Not enough products in stock.');
        } else {
          // Updates quantity in database
          const updatedQuantity = data.quantity - quantity;
          fetch(`https://biziaapi.onrender.com/products/${productId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: updatedQuantity }),
          })
            .then((resp) => {
              if (!resp.ok) {
                throw new Error('Error updating data');
              }
              return resp.json();
            })
            .then((updatedData) => {
              // Adds the sold item to soldItems route
              fetch('https://biziaapi.onrender.com/soldItems', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  productid: data.productid,
                  productname: data.productname,
                  quantity: quantity,
                  amount: quantity * data.price,
                }),
              })
                .then((resp) => {
                  if (!resp.ok) {
                    throw new Error('Error adding sold item');
                  }
                  return resp.json();
                })
                .then((data) => {
                  setMessage('Item sold successfully.');
                  setProductId('');
                  setQuantitySold('');
                })
                .catch((error) => console.error('Error adding sold item', error));
            })
            .catch((error) => console.error('Error updating data', error));
        }
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <div>
      <h2 className='font-bold'>Update sold items</h2>
      <p>Fill in the productID and quantity of items sold today</p>
      <form>
        <div>
          <label className="block font-medium " >Product ID:</label>
          <input 
          type="text" 
          value={productId} 
          onChange={handleProductIdChange}
          className="border p-2 rounded-md flex-grow w-[60%]"

          />
        </div>
        <div>
          <label className="block font-medium " >Quantity Sold:</label>
          <input 
          type="number" 
          value={quantitySold} 
          onChange={handleQuantitySoldChange}
          className="border p-2 rounded-md flex-grow w-[60%]"
          
          />
        </div>
        <button 
        type="button" 
        onClick={handleSellItem}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >Sell</button>
      </form>
      {message && <p className="text-red-500 mt-2" >{message}</p>}
    </div>
  );
}

export default SoldItems;
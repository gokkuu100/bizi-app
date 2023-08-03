import React, { useEffect, useState } from 'react';

function SearchStock() {
  const [searchTerm, setSearchTerm] = useState('');
  const [productArray, setProductArray] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch(`https://biziaapi.onrender.com/products`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Error fetching data');
        }
        return resp.json();
      })
      .then((data) => {
        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
          throw new Error('Wrong format');
        }
        setProductArray(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error('Error fetching data', error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredSearch = productArray.filter((product) =>
      product.productname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filteredSearch);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Search Transaction</h2>
      <form>
        <label>
          <strong>Search:</strong>
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name..."
          className="border p-2 rounded-md w-[60%]"
        />
      </form>
      {filteredProducts.length > 0 && (
        <div className="mt-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border p-4 rounded-md mb-4">
              <strong className="text-lg">{product.productname}</strong>
              <p className="text-gray-600">
                <strong>Category:</strong> {product.category}
                <br />
                <strong>Quantity:</strong> {product.quantity}
                <br />
                <strong>Timestamp:</strong> {product.timestamp}
                <br />
                <strong>Description:</strong> {product.description}
                <br />
                <strong>Price:</strong> {product.price}
                <br />
                <strong>Manufacturer:</strong> {product.manufacturer}
                <br />
                <strong>Availability:</strong>{' '}
                {product.availability ? 'Available' : 'Not Available'}
              </p>
            </div>
          ))}
        </div>
      )}
      {filteredProducts.length === 0 && searchTerm && (
        <p className="text-red-500 mt-2">No products found.</p>
      )}
    </div>
  );
}

export default SearchStock;
import React from 'react'

function ViewStock({ products }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {Object.values(products).map((product) => (
            <div key={product.key} className="bg-white p-4 shadow-md rounded-md">
                <h2 className="text-xl font-semibold mb-2">Name: {product.productname}</h2>
                <p className="text-gray-600">ProdID: {product.productid}</p>
                <p className="text-gray-600">Category: {product.category}</p>
                <h4 className="text-lg font-semibold mt-2">Quantity: {product.quantity}</h4>
                <p className="text-gray-600">Description: {product.description}</p>
                <p className="text-gray-600">Price: {product.price}</p>
                <p className="text-gray-600">Manufacturer: {product.manufacturer}</p>
                <p className="text-gray-600">Availability: {product.availability}</p>
                <p className="text-gray-600">Date added: {product.timestamp}</p>
            </div>
        ))}
    </div>
  )
}

export default ViewStock;
import React, { useState } from 'react'

function DeleteStock({ remove }) {
  const [productidInput, setProductidInput] = useState('');


  const handleInputChange = (event) => {
    setProductidInput(event.target.value);
  };

  const handleDelete = () => {
    remove(productidInput)
    setProductidInput('')
  }

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-semibold mb-4'>Delete from stock</h2>
      <form>
        <label className='block font-medium'>Enter product id</label>
        <br />
        <input 
        type="text" 
        value={productidInput} 
        onChange={handleInputChange}
        className='border p-2 rounded-md w-[60%]'
         /><br />
        <button  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" type='button' onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
}

export default DeleteStock;
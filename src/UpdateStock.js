import React, { useState } from 'react'

function UpdateStock() {
    const [formData, setFormData] = useState({
        productid: "",
        productname: "",
        category: "",
        quantity: "",
        date: "",
        description: "",
        price: "",
        manufacturer: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}))
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const newForm = {
            productid:formData.productid,
            productname:formData.productname,
            category: formData.category,
            quantity: formData.quantity,
            date: formData.date,
            description: formData.description,
            price: parseFloat(formData.price),
            manufacturer: formData.manufacturer
        }

        fetch(`https://biziaapi.onrender.com/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newForm)
        })
        .then((resp) => {
            if(!resp.ok) {
                throw new Error("Error adding new form")
            }
            return resp.json();
        })
        .then((data) => {
            alert("New form added")
            console.log("Form added", data);
        })
        .catch((error) => {
            console.error("Error", error);
        })

        setFormData({
            productid: "",
            productname: "",
            category: "",
            quantity: "",
            date: "",
            description: "",
            price: "",
            manufacturer: ""
        })
    }
  return (
    <div className='p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Add new product</h2>
        <form onSubmit={handleSubmit}>
        <label>Enter product id:</label><br />
            <input
             type='text'
             name='productid'
             value={formData.productid}
             onChange={handleChange}
             className='border p-2 rounded-md w-[60%]'
             required
            ></input><br />
            <label>Enter product name:</label><br />
            <input
             type='text'
             name='productname'
             value={formData.productname}
             onChange={handleChange}
             className='border p-2 rounded-md w-[60%]'
             required
            ></input><br />
            <label>Enter Category: </label><br />
            <input
             type='text'
             name='category'
             value={formData.category}
             onChange={handleChange}
             className='border p-2 rounded-md w-[60%]'
             required
             ></input><br />
            <label>Quantity</label><br />
            <input
             type='number'
             name='quantity'
             value={formData.quantity}
             onChange={handleChange}
             className='border p-2 rounded-md w-[60%]'
             required
            ></input><br />
            <label>Enter description</label><br />
            <input
             type='text'
             name='description'
             value={formData.description}
             onChange={handleChange}
             className='border p-2 rounded-md w-[60%]'
             required
            ></input><br />
            <label>Enter price: </label><br />
            <input
             type='number'
             name='price'
             value={formData.price}
             onChange={handleChange}
             className='border p-2 rounded-md w-[60%]'
             required
            ></input><br />
            <label>Manufacturer</label><br />
            <input
             type='text'
             name='manufacturer'
             value={formData.manufacturer}
             onChange={handleChange}
             className='border p-2 rounded-md w-[60%]'
             required
            ></input><br />
            <label>Date added:</label><br />
            <input
             type='date'
             name='date'
             value={formData.date}
             onChange={handleChange}
             className='border p-2 rounded-md w-[60%]'
             required
            ></input>
            <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" type='submit'>Add Form</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateStock;
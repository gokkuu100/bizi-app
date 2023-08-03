import React, { useEffect, useState } from 'react'
import ViewStock from './ViewStock'
import UpdateStock from './UpdateStock'
import DeleteStock from './DeleteStock'
import SearchStock from './SearchStock'
import SoldItems from './SoldItems'
import ProductSold from './ProductsSold'
import NavBar from './NavBar'
import { Routes, Route, Switch } from "react-router-dom";
import Home from './Home'
import SignIn from './components/auth/SignIn'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [productArray, setProductArray] = useState ([])
  const [enlistedStocks, setEnlistedStock] = useState([])

    useEffect(() => {
    fetch(`https://biziaapi.onrender.com/products`)
    .then((resp) => {
      if(!resp.ok) {
        throw new Error("Error fetching data")
      }
      return resp.json();
    })
    .then((data) => {
      if(!data || typeof data !== 'object' || Object.keys(data).length === 0) {
        throw new Error (`Wrong format`)
      }
      setProductArray(data)
    })
    .catch((error) => console.error("Error fetching data", error))
  }, [])

    const removestock = (id) => {
    fetch(`https://biziaapi.onrender.com/products/${id}`, {
      method:"DELETE",
      headers: {
        "Content-Type":"application/json"
      },
    })
    .then((resp) => {
      if(!resp.ok) {
        throw new Error("Error fetching data")
      }
      return resp.json();
    })
    .then((data) => {
      setEnlistedStock(data)
      alert("Deleted from database")
    })
    .catch((error) => console.error("Error deleting from server", error))
  } 



  return (

      <div>
        {isAuthenticated ? (
          <>
            <NavBar />
            <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/viewstock" element={<ViewStock products={productArray} />} />
            <Route path="/updatestock" element={<UpdateStock />} />
            <Route path="/deletestock" element={<DeleteStock remove={removestock} />} />
            <Route path="/searchstock" element={<SearchStock />} />
            <Route path="/solditems" element={<SoldItems />} />
            <Route path="/productsold" element={<ProductSold />} />
            </Routes>
          </>
        ) : (
          <SignIn setIsAuthenticated={setIsAuthenticated} />
        )}
      </div>
  
  );
}

export default App;

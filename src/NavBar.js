import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ViewStock from "./ViewStock";
import UpdateStock from "./UpdateStock";
import DeleteStock from "./DeleteStock";
import SearchStock from "./SearchStock";
import SoldItems from "./SoldItems";
import ProductSold from "./ProductsSold";

// const linkStyles = {
//   display: "inline-block",
//   width: "50px",
//   padding: "12px",
//   margin: "0 6px 6px",
//   background: "blue",
//   textDecoration: "none",
//   color: "white",
// };

function NavBar() {
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
    <div className="flex">
        <div className="bg-purple-600 min-h min-h-screen w-48 p-4 flex flex-col">
            <NavLink 
             to="/home"
             exact
             className="block my-2 text-black no underline"
            >
                Home
            </NavLink>
            <NavLink 
             to="/viewstock"
             exact
             className="block my-2 text-black no underline"
            >
                ViewStock
            </NavLink>
            <NavLink 
             to="/updatestock"
             exact
             className="block my-2 text-black no underline"
            >
                UpdateStock
            </NavLink>
            <NavLink 
             to="/deletestock"
             exact
             className="block my-2 text-black no underline"
            >
                DeleteStock
            </NavLink>
            <NavLink 
             to="/solditems"
             exact
             className="block my-2 text-black no underline"
            >
                SoldItems
            </NavLink>
            <NavLink 
             to="/searchstock"
             exact
             className="block my-2 text-black no underline"
            >
                SearchStock
            </NavLink>
            <NavLink 
             to="/productsold"
             exact
             className="block my-2 text-black no underline"
            >
                ProductSold
            </NavLink>
        </div>
        
        <div className="flex-grow p-4">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/viewstock" element={<ViewStock products={productArray} />} />
          <Route path="/updatestock" element={<UpdateStock />} />
          <Route path="/deletestock" element={<DeleteStock remove={removestock} />} />
          <Route path="/searchstock" element={<SearchStock />} />
          <Route path="/solditems" element={<SoldItems />} />
          <Route path="/productsold" element={<ProductSold />} />          
        </Routes>
        </div>
    </div>
    )
}

export default NavBar
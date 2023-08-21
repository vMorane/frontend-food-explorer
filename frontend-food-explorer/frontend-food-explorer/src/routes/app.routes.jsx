import { Routes, Route } from "react-router-dom";

import { New } from "../pages/New";
import { Home } from '../pages/Home';
import { Edit } from "../pages/Edit";
import { Details } from '../pages/Details';
import { Payment } from '../pages/Payment';
import { NotFound } from "../pages/NotFound";

import { useAuth } from '../hooks/auth'
import { Orders } from "../pages/Orders";


export function AppRoutes() {

  const {user} = useAuth()

  const handleRoutes = () => {
    if(user.admin){
      return (
        <Routes >

        <Route path="/" element={<Home />} />
        <Route path="/create" element={<New />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />

        </Routes>

      )
    } else {
      return (
        <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />

        </Routes>
      )
    }
  }

  return (
    handleRoutes()
  )
}
import { Navigate } from "react-router-dom";


export function Logout() {

  return (
    <Navigate replace to='/' />
  )
}
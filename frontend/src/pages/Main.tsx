import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export function Main() {

  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Link to='/profile'>profile</Link> <Link to='/login'>login</Link>
    </>
  )
}
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "primereact/button";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => void loginWithRedirect()}>Connecte toi</Button>;
}

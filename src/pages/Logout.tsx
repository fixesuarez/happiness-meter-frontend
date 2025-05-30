import { useAuth0 } from "@auth0/auth0-react";

export default function Logout() {
  const { logout } = useAuth0();

  return <button onClick={() => void logout()}>Log out</button>;
}

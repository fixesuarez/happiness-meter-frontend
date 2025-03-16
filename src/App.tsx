import "@/App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import AppToolbar from "@/components/AppToolbar";
import styled from "styled-components";
import { post } from "@/utils/httpWrapper";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "./store/userSlice";
import { User } from "./models/user";

const ContentLayout = styled.div`
  padding: 16px;
`;

function App() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (isLoading) return;

      if (!isAuthenticated) {
        await navigate("/login");
        return;
      }
      if (user) {
        const currentUser: User = (await post("/users/get_or_create/", {
          email: user.email,
          name: user.given_name,
        })) as User;
        dispatch(updateCurrentUser(currentUser));
        await navigate("/profile");
      }
    };

    void fetchData();
  }, [isLoading]);

  return (
    <>
      <AppToolbar />
      {isLoading && <div>Loading...</div>}
      <ContentLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ContentLayout>
    </>
  );
}

export default App;

import ProfileCard from "@/components/ProfileCard";
import ScoreForm from "@/components/ScoreForm";
import { RootState } from "@/store";
import { get } from "@/utils/httpWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useAuth0();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (!currentUser) return;
    void get(`/scores/${currentUser?._id}/`);
  }, [currentUser]);

  return (
    <>
      {user && <ProfileCard user={user} />}
      <ScoreForm />
    </>
  );
}

export default Profile;

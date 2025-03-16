import ProfileCard from "@/components/ProfileCard";
import ScoreForm from "@/components/ScoreForm";
import { RootState } from "@/store";
import { get } from "@/utils/httpWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useAuth0();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  void get(`/scores/${currentUser?._id}/`);

  return (
    <>
      {user && <ProfileCard user={user} />}
      <ScoreForm />
    </>
  );
}

export default Profile;

import ProfileCard from "@/components/ProfileCard";
import ScoreForm from "@/components/ScoreForm";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
    const { user } = useAuth0();

    return (
        <>
            {user && <ProfileCard user={user} />}
            <ScoreForm />
        </>
    );
}

export default Profile;
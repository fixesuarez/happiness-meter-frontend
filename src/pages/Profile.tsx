import ProfileCard from "@/components/ProfileCard";
import ScoreForm from "@/components/ScoreForm";
import { UserScore } from "@/models/score";
import { RootState } from "@/store";
import { get } from "@/utils/httpWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useAuth0();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const errorToast = useRef<Toast>(null);

  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser) return;
    get(`/scores/${currentUser?._id}/`)
      .then((scores: UserScore[]) => {
        if (typeof scores.at(-1)?.score !== "number") {
          setIsFormVisible(true);
        }
      })
      .catch(() => {
        errorToast.current?.show({
          severity: "error",
          summary: "Erreur",
          detail: "Dsl frère j'ai pas réussi à choper l'historique",
          life: 8000,
        });
      });
  }, [currentUser]);

  return (
    <>
      {user && <ProfileCard user={user} />}
      {isFormVisible && <ScoreForm />}
      <Toast ref={errorToast} />
    </>
  );
}

export default Profile;

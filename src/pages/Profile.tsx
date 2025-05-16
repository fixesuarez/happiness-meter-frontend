import ProfileCard from "@/components/ProfileCard";
import ScoreTable from "@/components/ScoreTable";
import ScoreForm from "@/components/scoreForm/ScoreForm";
import { UserScore } from "@/models/score";
import { RootState } from "@/store";
import { get } from "@/utils/httpWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ScoreChart from "@/components/ScoreChart";
import { DatasetInput } from "@/models/chart";

function Profile() {
  const { user } = useAuth0();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const errorToast = useRef<Toast>(null);

  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const [scores, setScores] = useState<UserScore[]>();
  const [labels, setLabels] = useState<string[]>();
  const [datasetInput, setDatasetInput] = useState<DatasetInput[]>();

  useEffect(() => {
    if (!currentUser) return;
    get(`/scores/${currentUser?._id}/`)
      .then((scores: UserScore[]) => {
        if (typeof scores.at(-1)?.score !== "number") {
          setIsFormVisible(true);
        }

        setScores(scores);
        setDatasetInput([
          {
            data: scores.map((score) => score.score),
            label: "Moi",
          },
        ]);
        setLabels(scores.map((score) => score.date));
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
      {isFormVisible && (
        <ScoreForm onFormClose={() => setIsFormVisible(false)} />
      )}
      <ScoreChart labels={labels} datasets={datasetInput} />
      {scores && <ScoreTable scores={scores} />}
      <Toast ref={errorToast} />
    </>
  );
}

export default Profile;

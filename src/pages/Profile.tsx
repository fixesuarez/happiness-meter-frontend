import ProfileCard from "@/components/ProfileCard";
import ScoreTable from "@/components/ScoreTable";
import ScoreForm from "@/components/scoreForm/ScoreForm";
import { UserScore } from "@/models/score";
import { RootState } from "@/store";
import { useAuth0 } from "@auth0/auth0-react";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ScoreChart from "@/components/ScoreChart";
import { DatasetInput } from "@/models/chart";
import { useScoreStore } from "@/store/scores";

function Profile() {
  const { user } = useAuth0();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const errorToast = useRef<Toast>(null);

  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const [labels, setLabels] = useState<string[]>();
  const [datasetInput, setDatasetInput] = useState<DatasetInput[]>();

  const scores = useScoreStore((state) => state.scores);
  const getScores = useScoreStore((state) => state.getScores);

  useEffect(() => {
    if (!currentUser) return;
    getScores(currentUser._id)
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
  useEffect(() => {
    setDatasetInput([
      {
        data: scores.map((score) => score.score),
        label: "Moi",
      },
    ]);
    setLabels(scores.map((score) => score.date));
  }, [scores]);

  return (
    <>
      {user && <ProfileCard user={user} />}
      {isFormVisible && <ScoreForm setIsFormVisible={setIsFormVisible} />}
      <ScoreChart labels={labels} datasets={datasetInput} />
      <ScoreTable />
      <Toast ref={errorToast} />
    </>
  );
}

export default Profile;

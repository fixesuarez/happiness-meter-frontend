import { User } from "@auth0/auth0-react";
import { Card } from "primereact/card";
import styled from "styled-components";
import LabelValue from "@/components/style/LabelValue";
import { useScoreStore } from "@/store/scores";
import {
  getAverageScore,
  getCompletionRate,
  getMaxScore,
  getMinScore,
} from "@/utils/stats";
import { TextHeading6 } from "./style/texts";

const ProfileCardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  column-gap: 16px;
  border-radius: 8px;
`;
const ProfilePicture = styled.img`
  width: 100px;
  object-fit: contain;
  border-radius: 50%;
`;
const ProfileName = styled(TextHeading6)`
  margin-bottom: 8px;
`;
const TextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 4px;
`;
const MinMaxContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

export default function ProfileCard({ user }: { user: User }) {
  const scores = useScoreStore((state) => state.scores);

  return (
    <Card>
      <ProfileCardContainer>
        <ProfilePicture src={user.picture} />
        <TextsContainer>
          <ProfileName>{user.given_name}</ProfileName>
          <LabelValue label="Moyenne" value={`${getAverageScore(scores)}/10`} />
          <MinMaxContainer>
            <LabelValue label="Min" value={`${getMinScore(scores)}/10`} />
            <LabelValue label="Max" value={`${getMaxScore(scores)}/10`} />
          </MinMaxContainer>
          <LabelValue
            label="Taux de complétion"
            value={`${getCompletionRate(scores)}%`}
          />
        </TextsContainer>
      </ProfileCardContainer>
    </Card>
  );
}

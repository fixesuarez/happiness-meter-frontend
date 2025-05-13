import dayjs from "dayjs";
import styled from "styled-components";
import weekOfYear from "dayjs/plugin/weekOfYear";

const TitleContainer = styled.div`
  align-self: center;
`;
const FormTitle = styled.h4`
  margin: 0;
`;
const Subtitle = styled.span`
  letter-spacing: 0.2px;
  font-size: 0.8rem;
`;

dayjs.extend(weekOfYear);
const formatDate = (date: dayjs.Dayjs) => date.format("DD/MM");

export default function ScoreFormHeader({
  lastSunday,
}: {
  lastSunday: dayjs.Dayjs;
}) {
  const lastMonday = lastSunday.subtract(6, "day");
  return (
    <TitleContainer>
      <FormTitle>Note de la semaine</FormTitle>
      <Subtitle>
        Semaine #{dayjs().week()} - du {formatDate(lastMonday)} au{" "}
        {formatDate(lastSunday)}
      </Subtitle>
    </TitleContainer>
  );
}

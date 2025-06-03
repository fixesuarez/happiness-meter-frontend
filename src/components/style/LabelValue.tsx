import styled from "styled-components";
import { TextCaption, TextSubtitle2 } from "./texts";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

export default function LabelValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Wrapper>
      <TextSubtitle2>{label} :</TextSubtitle2>
      <TextCaption>{value}</TextCaption>
    </Wrapper>
  );
}

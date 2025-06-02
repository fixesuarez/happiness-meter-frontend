import dayjs from "dayjs";
import { Button } from "primereact/button";
import { useState } from "react";
import styled from "styled-components";
import ScoreFormHeader from "./ScoreFormHeader";
import ScoreFormContent from "./ScoreFormContent";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FulfilledContainer = styled.div`
  align-self: center;
`;

export default function ScoreForm({
  setIsFormVisible,
}: {
  setIsFormVisible: (val: boolean) => void;
}) {
  const [isFormFulfilled, setIsFormFulfilled] = useState<boolean>(false);

  const lastSunday = dayjs().day(0);

  const formFulfilledContent = (
    <FulfilledContainer>
      <p>Merci chacal c'est noté !</p>
      <Button onClick={() => setIsFormVisible(false)} type="button">
        Fermer
      </Button>
    </FulfilledContainer>
  );

  return (
    <FormWrapper>
      <ScoreFormHeader lastSunday={lastSunday} />
      {isFormFulfilled ? (
        formFulfilledContent
      ) : (
        <ScoreFormContent
          lastSunday={lastSunday}
          setIsFormFulfilled={setIsFormFulfilled}
        />
      )}
    </FormWrapper>
  );
}

import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { Button } from "primereact/button";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { useState, useRef } from "react";
import styled from "styled-components";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { post } from "@/utils/httpWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
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
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 4px;
  & > label {
    margin-left: 12px;
    color: #ccc;
    font-size: 0.9rem;
  }
`;
const InputError = styled.span`
  margin-left: 12px;
  color: #ff0000;
  font-size: 0.8rem;
`;

interface ScoreForm {
  score: number | null;
  comment?: string;
}

export default function ScoreForm() {
  const [isScoreRequestPending, setIsScoreRequestPending] =
    useState<boolean>(false);
  const errorToast = useRef<Toast>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      score: null,
      comment: undefined,
    },
  });
  const onSubmit: SubmitHandler<ScoreForm> = async (data) => {
    setIsScoreRequestPending(true);
    const payload = {
      ...data,
      date: lastSunday.format("DD/MM/YYYY"),
      user_id: currentUser?._id,
    };
    try {
      await post("/score", payload);
    } catch {
      errorToast.current?.show({
        severity: "error",
        summary: "Erreur",
        detail: "Faut dire à Fx ce gros trou de balle que son code marche pas",
        life: 8000,
      });
    } finally {
      setIsScoreRequestPending(false);
    }
  };

  dayjs.extend(weekOfYear);
  const lastSunday = dayjs().day(0);
  const lastMonday = lastSunday.subtract(6, "day");
  const formatDate = (date: dayjs.Dayjs) => date.format("DD/MM");

  return (
    <Form onSubmit={void handleSubmit(onSubmit)}>
      <TitleContainer>
        <FormTitle>Note de la semaine</FormTitle>
        <Subtitle>
          Semaine #{dayjs().week()} - du {formatDate(lastMonday)} au{" "}
          {formatDate(lastSunday)}
        </Subtitle>
      </TitleContainer>
      <InputContainer>
        <label>Note</label>
        <Controller
          name="score"
          control={control}
          rules={{ required: "N'oublie pas de mettre ta note mon ami" }}
          render={({ field }) => (
            <InputNumber
              id="note-input"
              value={field.value}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                field.onChange(e.value)
              }
              variant="filled"
              suffix="/10"
              showButtons
              buttonLayout="horizontal"
              step={0.5}
              min={0}
              max={10}
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
            />
          )}
        />
        {errors.score && <InputError>{errors.score.message}</InputError>}
      </InputContainer>
      <InputContainer style={{ width: "100%" }}>
        <label>Commentaire</label>
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <InputTextarea
              id="comment-input"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              autoResize
              rows={5}
              cols={30}
              style={{ width: "100%" }}
            />
          )}
        />
      </InputContainer>
      <Button loading={isScoreRequestPending}>Valider</Button>
      <Toast ref={errorToast} />
    </Form>
  );
}

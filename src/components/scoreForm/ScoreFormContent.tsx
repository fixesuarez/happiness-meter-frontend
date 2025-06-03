import styled from "styled-components";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { UserScorePayload } from "@/models/score";
import { createOrUpdateScore } from "@/services/scores";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import dayjs from "dayjs";
import { Toast } from "primereact/toast";
import { useScoreStore } from "@/store/scores";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
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

export default function ScoreFormContent({
  lastSunday,
  setIsFormFulfilled,
}: {
  lastSunday: dayjs.Dayjs;
  setIsFormFulfilled: (val: boolean) => void;
}) {
  const [isScoreRequestPending, setIsScoreRequestPending] =
    useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const errorToast = useRef<Toast>(null);
  const getScores = useScoreStore((state) => state.getScores);

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
  const preventDefaultAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void handleSubmit(onSubmit)();
  };
  const onSubmit: SubmitHandler<ScoreForm> = async (data) => {
    setIsScoreRequestPending(true);
    const payload: UserScorePayload = {
      ...data,
      date: lastSunday.format("DD-MM-YYYY"),
      user_id: currentUser?._id,
    };
    try {
      if (!currentUser) return;
      await createOrUpdateScore(payload);
      await getScores(currentUser?._id);
      setIsFormFulfilled(true);
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
  return (
    <>
      <Form onSubmit={preventDefaultAndSubmit}>
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
      </Form>
      <Toast ref={errorToast} />
    </>
  );
}

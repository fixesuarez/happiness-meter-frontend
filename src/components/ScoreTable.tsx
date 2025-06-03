import { DataTable, DataTableDataSelectableEvent } from "primereact/datatable";
import { UserScore, UserScorePayload } from "@/models/score";
import { Column, ColumnEditorOptions, ColumnEvent } from "primereact/column";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { createOrUpdateScore } from "@/services/scores";
import { useScoreStore } from "@/store/scores";
import { useMemo } from "react";

dayjs.extend(customParseFormat);

export default function ScoreTable() {
  const scores = useScoreStore((state) => state.scores);
  const reverseScores = useMemo(() => [...scores].reverse(), [scores]);

  const isCellSelectable = (event: DataTableDataSelectableEvent): boolean => {
    return event.data.field === "comment";
  };

  const scorePeriodTemplate = (userScore: UserScore) => {
    const endDate = dayjs(userScore.date, "DD-MM-YYYY", true);
    const startDate = endDate.subtract(6, "days");
    return (
      <>
        Du {startDate.format("DD-MM")}
        <br />
        au {endDate.format("DD-MM")}
      </>
    );
  };

  const scoreCellEditor = (options: ColumnEditorOptions) => {
    return (
      <InputNumber
        id="note-input"
        value={options.value as number}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          options.editorCallback && options.editorCallback(e.value)
        }
        onKeyDown={(e) => e.stopPropagation()}
        variant="filled"
        step={0.5}
        min={0}
        max={10}
        style={{ maxWidth: "50px" }}
      />
    );
  };
  const commentCellEditor = (options: ColumnEditorOptions) => {
    return (
      <InputTextarea
        id="comment-input"
        value={options.value as string}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          options.editorCallback!(e.target.value)
        }
        autoResize
        rows={5}
        cols={30}
        style={{ width: "100%" }}
      />
    );
  };

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const onCellEditComplete = (e: ColumnEvent) => {
    if (!currentUser) return;

    const rowData = e.rowData as UserScore;
    const newRowData = e.newRowData as UserScore;
    if (e.field === "score" && typeof e.newValue === "number") {
      rowData.score = e.newValue;
    } else if (
      e.field === "comment" &&
      rowData.comment !== newRowData.comment
    ) {
      rowData.comment = e.newValue as string;
    } else {
      e.originalEvent.preventDefault();
      return;
    }

    const payload: UserScorePayload = {
      ...rowData,
      user_id: currentUser._id,
    };
    createOrUpdateScore(payload)
      .then(() => {
        void useScoreStore.getState().getScores(currentUser._id);
      })
      .catch(() => {
        // Todo: handle error
      });
  };

  return (
    <>
      <DataTable
        value={reverseScores}
        style={{ fontSize: "0.8em" }}
        editMode="cell"
        isDataSelectable={isCellSelectable}
      >
        <Column
          field="date"
          header="Date"
          body={scorePeriodTemplate}
          sortable
          style={{ minWidth: "95px" }}
        />
        <Column
          field="score"
          header="Note"
          editor={(options) => scoreCellEditor(options)}
          onCellEditComplete={onCellEditComplete}
          style={{ maxWidth: "70px" }}
        />
        <Column
          field="comment"
          header="Commentaire"
          editor={(options) =>
            typeof (options.rowData as UserScore).score === "number"
              ? commentCellEditor(options)
              : null
          }
          onCellEditComplete={onCellEditComplete}
        />
      </DataTable>
    </>
  );
}

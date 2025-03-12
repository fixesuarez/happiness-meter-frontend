import { Button } from 'primereact/button';
import { InputNumber, InputNumberValueChangeEvent }  from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'; 
import { useState } from 'react';
import styled from 'styled-components';

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
`
const FormTitle = styled.h4`
    margin: 0;
    align-self: center;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 4px;
    & > label {
        margin-left: 12px;
        color: #CCC;
        font-size: 0.9rem;
    }
`

export default function ScoreForm() {
    const [score, setScore] = useState<number | null>()
    const [comment, setComment] = useState<string>()

    return (
        <Form>
            <FormTitle>Note de la semaine</FormTitle>
            <InputContainer>
                <label>Note</label>
                <InputNumber
                    id='note-input'
                    value={score}
                    onValueChange={(e: InputNumberValueChangeEvent) => setScore(e.value)}
                    variant='filled'
                    suffix='/10'
                    showButtons
                    buttonLayout="horizontal"
                    step={0.5}
                    min={0}
                    max={10}
                    incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus" />
            </InputContainer>
            <InputContainer style={{width: "100%"}}>
            <label>Commentaire</label>
                <InputTextarea
                    id='comment-input'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    autoResize
                    rows={5}
                    cols={30}
                    style={{width: "100%"}} />
            </InputContainer>
            <Button>Valider</Button>
        </Form>
    )
}
import styled from 'styled-components';
import Text from './Text';


const CustomRadio = styled.label`
    & label {
        cursor: pointer;
    }

    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .custom-radio-button {
        border: 1px solid #D0CFCF;
        position: relative;
        height: 20px;
        width: 20px;
        background-color: transparent;
        border-radius: 50%;
        cursor: pointer;
    }

    input {
        &:checked + .custom-radio-button {
            border-color:  ${(props) => props.theme.colors.secondary};
        }

        &:checked + .custom-radio-button:after {
            content: "";
            position: absolute;
            display: block;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: ${(props) => props.theme.colors.secondary};
        }
    }
`

export default function RadioButton({ position, register }: any) {
    const id = position.id + position.name
    return (
        <CustomRadio>
            <input id={id} value={position.id} name='position' type="radio" {...register} />
            <span className="custom-radio-button" ></span>
            <label htmlFor={id}><Text>{position.name}</Text></label>
        </CustomRadio>
    )
}


import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Heading from '../Common/Heading';
import Section from '../Common/Section';
import RadioButton from '../Common/RadioButton';
import Button from '../Common/Button';
import { usePositons, useUsers } from '../../store';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import StyledProgress from '../Common/StyledProgress';
import { client } from '../../lib/actions';
import { getImageDimensions } from '../../lib/utils';
import { CircularProgress } from '@mui/material';
import { SubmitStatus } from '../../lib/definitions';
import successImage from "../../images/success-image.svg"

const StyledForm = styled.form`
    max-width: 380px;
    margin: 0 auto;    
`
const StyledTextField = styled(TextField)`
    width: 100%;

    // Root class for the input field
    & .MuiOutlinedInput-root {
        color: #000000;
        height: 54px;
        font-family: Nunito, sans-serif;

        // Class for the border around the input field
        & .MuiOutlinedInput-notchedOutline {
            border-color: #D0CFCF;
        }
        &.Mui-error .MuiOutlinedInput-notchedOutline {
            border-color: ${(props) => props.theme.colors.error};
        }
        &.Mui-focused {
            & .MuiOutlinedInput-notchedOutline {
                border-color: #D0CFCF;
            }
            &.Mui-error .MuiOutlinedInput-notchedOutline {
                border-color: ${(props) => props.theme.colors.error};
            }
        }
        &:hover:not(.Mui-focused) {
            /* & .MuiOutlinedInput-notchedOutline {
                border-color: #D0CFCF;
            } */
        }
    }
    // Class for the label of the input field
    & .MuiInputLabel-outlined {
        font-family: Nunito, sans-serif;
        color: #7E7E7E;
        padding-left: 3px;
        &.Mui-focused {
            color: #7E7E7E;
            &.Mui-error{
                color:${(props) => props.theme.colors.error};
            }
        }
       

    }
 
    & .MuiFormHelperText-root {
        &.Mui-error{
            color: ${(props) => props.theme.colors.error}
        }
    }
`
const InputGroup = styled.div`
    position: relative;
    & .input-field{
        
    }
    & .error-message{
        position: absolute;
        bottom: -20px;
        left: 16px;
        font-size: 12px;
        color: ${(props) => props.theme.colors.error};

    }

    & .message {
      margin-top: 3px;
      margin-left: 16px;
      font-size: 12px;
      color: #7E7E7E;
    }
`
const Inputs = styled.div`
    display: flex;
    gap: 50px;
    flex-direction: column;
    margin-bottom: 23px;
`
const RadioGroup = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;

    & .error-message{
        position: absolute;
        bottom: -26px;
        left: 16px;
        font-size: 12px;
        color: ${(props) => props.theme.colors.error};
    }
`
const InputFile = styled.div`
position: relative;
    width: 100%;
    display: flex;
    margin-bottom: 50px;
    
    input[type="file"] {
        display: none;
    }

    .custom-file-upload {
        border: 1px solid ${(props) => props.theme.colors.textColor};
        border-radius: 3px 0 0 3px;
        padding: 14px;
        display: inline-block;

        cursor: pointer;
    }

    .file-name{
        width: 100%;
        padding: 14px 14px 14px 17px;
        color: #7E7E7E;
        border: 1px solid #7E7E7E;  
        border-left: none;
        border-radius: 0 3px 3px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .error-message{
        position: absolute;
        bottom: -26px;
        left: 16px;
        font-size: 12px;
        color: ${(props) => props.theme.colors.error};
    }
`
const SuccessImage = styled.div`
    img {
        margin: 0 auto;
    }
`

const emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const phonePattern = /^([\+]{0,1}380([0-9]{9})$)/;
const MAX_FILE_SIZE = 5000000;
const MIN_WIDTH = 70;
const MIN_HEIGHT = 70;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg"];


const schema = z.object({
    name: z
        .string()
        .min(2)
        .max(60),
    email: z
        .string()
        .regex(emailPattern, "Invalid Email"),
    phone: z
        .string()
        .regex(phonePattern, "Invalid phone number format"),
    position_id: z
        .string({ message: "Select position" })
        .refine(val => !isNaN(Number(val)), {
            message: "Must be a valid number",
        })
        .transform(val => Number(val)),
    photo: z
        .instanceof(FileList)
        // .array(z.instanceof(File))
        .refine((files) => files?.length > 0, "Select photo")
        .refine((files) => {
            return files[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB`
        })
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
            "The photo format must be jpeg/jpg type"
        )
        .refine(async (data) => {
            if (data.length === 0)
                return false
            const { width, height } = await getImageDimensions(data[0]);
            return (width < MIN_WIDTH || height < MIN_HEIGHT) ? false : true

        }, `Image dimensions should be bigger that${MIN_WIDTH}x${MIN_HEIGHT}`)
        .transform(files => files[0])


})

export type FormFields = z.infer<typeof schema>;

export default function Form() {
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ success: true, message: '' })
    const [imageName, setImageName] = useState()
    const posions = usePositons((state) => state.positions)
    const loading = usePositons((state) => state.loading)
    const getPositions = usePositons((state) => state.getPositions)
    const getUsers = useUsers(state => state.getUsers)
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid, isSubmitSuccessful } } = useForm<FormFields>({ resolver: zodResolver(schema) })

    useEffect(() => {
        getPositions()
    }, [])

    const onSubmit: SubmitHandler<FormFields> = async (data) => {

        const addedUserMessage = await client.addUser(data)
        setSubmitStatus(addedUserMessage)

        if (addedUserMessage.success) {
            getUsers()
        }
    }

    function showImageName(e: any) {
        const image = e.target.files[0]
        if (image) setImageName(image.name)
    }

    if (!submitStatus.success) {
        <Section>
            <Heading>{submitStatus.message}</Heading>
        </Section>
    }

    return (
        <Section id="signUp">
            <Heading>{isSubmitSuccessful ? "User successfully registered" : "Working with POST request"}</Heading>
            {isSubmitting && <StyledProgress />}
            {isSubmitSuccessful
                ?
                <SuccessImage>
                    <img src={successImage} alt="Success Image" />
                </SuccessImage>
                :
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <InputGroup>
                            <StyledTextField className='input-field' {...register("name")} error={errors.name?.message?.length! > 0} label="Your name" />
                            {errors.name && <div className='error-message'>{errors.name.message}</div>}
                        </InputGroup>
                        <InputGroup>
                            <StyledTextField className='input-field' {...register("email")} error={false} label="Email" />
                            {errors.email && <div className='error-message'>{errors.email.message}</div>}
                        </InputGroup>
                        <InputGroup>
                            <StyledTextField className='input-field' {...register("phone")} error={false} label="Phone" />
                            <div className='message'>
                                +38 (XXX) XXX - XX - XX
                            </div>
                            {errors.phone && <div className='error-message'>{errors.phone.message}</div>}
                        </InputGroup>
                    </Inputs>

                    <div style={{ marginBottom: "48px" }}>
                        <div style={{ marginBottom: "12px" }}>Select your position</div>
                        <RadioGroup>
                            {loading && <StyledProgress />}
                            {posions.map(position => (
                                <RadioButton position={position} register={register("position_id")} key={position.id} />
                            ))}
                            {errors.position_id && <div className='error-message'>{errors.position_id.message}</div>}
                        </RadioGroup>
                    </div>

                    <InputFile>
                        <label htmlFor="file-upload" className="custom-file-upload">Upload</label>
                        <input {...register("photo", { onChange: (e) => showImageName(e) })} id="file-upload" type="file" accept=".jpg,.jpeg" />
                        <div className='file-name'>{!imageName ? "Upload your photo" : imageName}</div>
                        {errors.photo && <div className='error-message'>{errors.photo.message?.toString()}</div>}
                    </InputFile>

                    <Button isValid={isSubmitting} type={"submit"} value={"Sign up"} style={{ margin: "0 auto" }} />
                </StyledForm>
            }
        </Section>
    )
}

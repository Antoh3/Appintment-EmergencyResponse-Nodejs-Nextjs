import { FormEvent, useState } from 'react';
import { Button, Card, Input, Textarea } from "@nextui-org/react";
import { styled } from "styled-components";
import TextareaAutosize from 'react-textarea-autosize';
import createAxiosInstance from '@/context/axiosInstance';
import { message } from 'antd';
import axios, { AxiosError } from 'axios';


const StyledCard = styled(Card)`
  padding: 10px; 
  width: 100%; 
  max-width: 1200px; 
  box-sizing: border-box; 
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; 
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 5px; 
`;

const Stethoscope = styled.span`
  font-size: 25px; 
`;



export default function Prescription({ patientId }: { patientId: any }) {
    const [content, setContent] = useState("");
    const [type, setType] = useState("prescription");

    const [formdata, setFormData] = useState({
        content: '',
        type: ''
    })
    console.log(content, type);

    const axiosInstance = createAxiosInstance();

    const handleInputChange = (event: any) => {
        setFormData({
            ...formdata,
            [event.target.name]: event.target.value
        })
    }

    const handleGivePrescription = async (e: FormEvent) => {
        e.preventDefault()
        if (type.trim() == '') return (message.error("Select type "));
        if (content.trim() == '') return (message.error("Provide patient prescription"));

        try {
            const response = await axiosInstance.post("http://localhost:5001/doctor/giveprescription", {
                type: type,
                content: content,
                patientId: patientId
            })
            if (response?.status === 200) {
                if (type == "prescription") {
                    message.success("Prescription given successfully");
                } else {
                    message.success("Recommendation given successfully");
                }

                setContent('')
                setType('')
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    message.error("Login first to write prescription to patient")
                }
                if (error.response?.status === 403) {
                    message.error("Login first to write prescription to patient")
                }
            }
        }


    }

    return (
        <div className="flex justify-center items-center ">
            <StyledCard>
                <Header>
                    <Stethoscope>🩺</Stethoscope>
                    <div>
                        <p className="text-2xl font-bold">Write patient prescriptions</p>
                    </div>
                    <Stethoscope>🩺</Stethoscope>
                </Header>
                {/* <Input
                 label="Drugs"
                 placeholder="Amoxyline,Panadol,Piriton..."
                 labelPlacement="outside"
                 className='mb-5'
                 /> */}
                <form action="" onSubmit={handleGivePrescription} className="bg-gray-200 p-5 bordered">
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">select type</option>
                        <option value="prescription">Prescription</option>
                        <option value="recommendation">Recommendation</option>
                    </select>
                    <Textarea
                        // variant="bordered"
                        label="write patient prescription here"
                        labelPlacement="outside"
                        placeholder={"1.Panadol (1x2)\n 2.Piriton (1x1)\n 3.Paracetamol (1x3) ...... "}
                        minRows={3}
                        style={{
                            width: '100%',
                            paddingLeft: "5px",
                            paddingTop: "1px",
                            textAlign: "left",
                            fontFamily: 'Times New Roman',
                            fontSize: "20px",
                            marginTop: "5px",
                        }}
                        name='content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Button
                        // color='primary'
                        variant="bordered"
                        className='bg-primary w-full mt-2'
                        type='submit'
                        onClick={handleGivePrescription}>Give Prescription</Button>
                </form>
                {/* <TextareaAutosize
                    placeholder="write prescription here...."
                    style={{ 
                        width: '100%',
                        paddingLeft:"5px",
                        paddingTop:"5px", 
                        textAlign:"left",
                        lineHeight:"20px",
                        fontFamily:'Times New Roman',
                        height:50
                    }} 
                    value={rx}
                    onChange={(e) => setRx(e.target.value)}
                /> */}
            </StyledCard>
        </div>
    );
}
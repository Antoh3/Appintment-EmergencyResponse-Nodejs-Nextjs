"use client";

import Link from "next/link";
import VerifyLocation from "@/components/VerifyLocation";
import { motion } from "framer-motion";
import { message } from "antd";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";


import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
// import { number } from "zod";



function Register() {
    const [loc, setLoc] = useState([0, 0]);
    const location = `${loc[0]},${loc[1]}`;
   
    // console.log(location);
    // console.log(`The location values are ${loc[0]} and ${loc[1]}`);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        idNumber: "",
        permanentLocation: [0,0],
        password: "",
    });
    // console.log(formData);
    const [currentStep, setCurrentStep] = useState(1); 
    const router = useRouter();


     const userLocation = {
        permanentLocation:loc
    }
    // console.log("I changed locatio to", formData.permanentLocation);


    const locationStatus = async () => {
        await VerifyLocation()
            .then((l: [number, number]) => {
                setLoc(l);
                setFormData((prevState:any) => ({
                    ...prevState,
                    permanentLocation:l,
                }))
                console.log("The location is ", l);
            })
            .catch(async (e) => {
                message.warning("Please allow location");
                // setTimeout(async () => {
                await VerifyLocation()
                    .then((l: any) => setLoc(l))
                    .catch((e) => {
                        message.error(
                            "Location is required to run the app. Please allow location!"
                        );
                    });
                // }, 3000);
            });
    };

    const handleInputChange = async (e: any) => {
        let formEvent = e;
        setFormData((prevState:any)=>{
            // console.log("The name is",formEvent.target.name)
            // if(formEvent.target.name === "permanentLocation"){
            //     console.log(formEvent.target.value.split(', '))
            //     return {...prevState, [formEvent.target.name]: formEvent.target.value.split(', ') }
            // }else{
                return {...prevState, [formEvent.target.name]: formEvent.target.value}
            // }
        })
    }

    // Function to validate basic details (called before moving to step 2)
    const verifyBasicDetails = async () => {
        await locationStatus();

        if (formData.firstName === "") {
            message.warning("First name is empty");
            return false;
        }
        if (formData.lastName === "") {
            message.warning("Last name is empty");
            return false;
        }
        if (
            formData.birthDate === "" ||
            Number(formData.birthDate.substring(0, 4)) > 2007 // Year format check
        ) {
            message.warning("Age should be at least 15 years");
            return false;
        }
        return true;
    };

    // Handle form submission (signup)
    const signupUser = async () => {
        // setTimeout( async () =>{
        if (!await verifyBasicDetails()) {
            message.error("Something went wrong!");
            return false;
        }

        // Email validation using regular expression
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(formData.email)) {
            message.error("Invalid email address");
            return false;
        }

        // Phone number validation (optional)
        // if (phone < 3000000000 || phone > 3999999999) {
        //   message.error("Invalid phone number");
        //   return false;
        // }

        if (formData.password.length < 8) {
            message.error("Password length must be greater than 7");
            return false;
        }
        // },3000)


        try {
            const response = await axios.post(
                "http://localhost:5001/patient/user",
                formData,
                // userLocation,
            );

            // console.log(response.data);


            if (response?.status === 200) {
                message.success("Registration successful.");
                console.log("Registration successful: ", response.data.user);
                router.push("/auth/login");
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 400) {
                    message.error("Patient already exists.");
                    console.log("Patient already exists: ", err.response.data.message);
                }
            } else {
                message.error("An error occurred. Please try again later.");
                console.error("Error during registration: ", err);
            }
        }

    };



    // Handle "Next" button click
    const handleNext = async () => {
        if (currentStep === 1 && !(await verifyBasicDetails())) {
            return; // Prevent going to step 2 if validation fails
        }
        setCurrentStep(currentStep + 1);
        console.log("next");
    };

    // Handle "Previous" button click
    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <>
            <div >
                <div className="">
                    <div className="signup_container">
                        <div className="flex flex-col space-y-2 text-center">
                            <Image
                                alt="logo"
                                className="mx-auto mb-2"
                                height={200}
                                src="/dokta-logo.svg"
                                width={50}
                            />
                            <h2 className="header">Hello 👋</h2>
                            {/* <p className="text-dark-700">Let us know more about yourself.</p> */}
                            <h1 className="text-2xl font-semibold tracking-tight">
                                SignUp
                            </h1>
                        </div>

                        {currentStep === 1 && (
                            <div id="signup_container_1">
                                <p>First Name:</p>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                // Set initial value
                                />
                                <p>Last Name:</p>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                // Set initial value
                                />
                                <p>Gender:</p>
                                <select
                                    name="gender"
                                    // defaultValue={formData.gender}
                                    value={formData.gender}
                                    onChange={handleInputChange}>
                                    <option>select gender....</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>

                                <p>Birthday:</p>
                                <input
                                    type="date"
                                    placeholder="Enter your birthday"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleInputChange}
                                />
                                {/* <p>Permanet Location:</p>
                                <input
                                    type="date"
                                    placeholder="Enter your birthday"
                                    onChange={(e) => setDob(e.target.value)}
                                    value={dob}
                                /> */}

                                <motion.button
                                    onClick={handleNext}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        justifyContent: "center"
                                    }}
                                >
                                    Next <BiSolidRightArrow />
                                </motion.button>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div id="signup_container_3" style={{ display: 'block' }}>
                                <p>Email:</p>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                // Set initial value
                                />
                                <p>Phone Number:</p>
                                <input
                                    type="tel"
                                    placeholder="e.g 07181236267"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />

                                <p>Password:</p>
                                <input
                                    type="password"
                                    placeholder="Enter strong password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                // Set initial value
                                />
                                <p>idNumber:</p>
                                <input
                                    type="number"
                                    placeholder="Enter idNumber"
                                    name="idNumber"
                                    value={formData.idNumber}
                                    onChange={handleInputChange}
                                // Set initial value
                                />

                                <input
                                    name="permanentLocation"
                                    value={formData.permanentLocation.join(", ")}
                                    hidden
                                />

                                <motion.button
                                    onClick={handlePrevious}
                                    whileTap={{ scale: 0.9 }}
                                    id="previous"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        justifyContent: "center"
                                    }}
                                >
                                    <BiSolidLeftArrow /> Previous
                                </motion.button>

                                <motion.button
                                    onClick={signupUser}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        justifyContent: "center"
                                    }}
                                >
                                    Signup <FaUserPlus />
                                </motion.button>
                            </div>
                        )}

                        <Link href={"/auth/login"}>Already have an account? SignIn</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
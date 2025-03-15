"use client"

import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import Ambulanceform from "./Ambulanceform";
import TrackAmbulance from "./TrackAmbulance";

const AmbulancePortal = () => {
    const emergencyCategories = [
        {
            title: "Medical Emergencies",
            items: [
                {
                    title: "Critical Emergency",
                    description: "Stay safe by following fire safety guidelines.",
                    image: "/media/m4.jpg",
                },
                {
                    title: "Intermidiate Emergency",
                    description: "Stay safe by following fire safety guidelines.",
                    image: "/media/M1.jpg",
                },
                {
                    title: "Normal Emergency",
                    description: "Stay safe by following fire safety guidelines.",
                    image: "/media/m3.avif",
                },
                {
                    title: "Others",
                    description: "Get ready for hurricanes with proper preparation.",
                    image: "/media/n4.jpg",
                },
            ],
        },
        {
            title: "Fire Emergencies",
            items: [
                {
                    title: "Critical Emergency",
                    description: "Stay safe by following fire safety guidelines.",
                    image: "/media/n1.jpg",
                },
                {
                    title: "Intermidiate Emergency",
                    description: "Stay safe by following fire safety guidelines.",
                    image: "/media/n2.jpg",
                },
                {
                    title: "Normal Emergency",
                    description: "Stay safe by following fire safety guidelines.",
                    image: "/media/n3.jpg",
                },
                {
                    title: "Others",
                    description: "Get ready for hurricanes with proper preparation.",
                    image: "/media/n4.jpg",
                },
            ],
        },
        {
            title: "Natural Calamities",
            items: [
                {
                    title: "Critical Emergency",
                    description: "Stay safe by following fire safety guidelines.",
                    image: "/media/n1.jpg",
                },
                {
                    title: "Intermidiate Emergency",
                    description: "Stay safe by following fire safety guidelines.",
                    image: "/media/n2.jpg",
                },
                {
                    title: "Normal Emergency",
                    description: "Stay safe by following fire safety guidelines.",
                    image: "/media/n3.jpg",
                },
                {
                    title: "Others",
                    description: "Get ready for hurricanes with proper preparation.",
                    image: "/media/n4.jpg",
                },
            ],
        },
        
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {emergencyCategories.map((category, index) => (
                <div key={index} className="mb-12">
                    <h2 className="text-3xl font-bold mb-2 p-2 text-gray-800">{category.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 border-b border-gray-800 pb-6 ">
                        {category.items.map((item, idx) => (
                            <Card
                                key={idx}
                                className="shadow-lg border border-gray-200 rounded-lg"
                                isHoverable
                            >
                                {/* Card Header with Image */}
                                <CardHeader className="p-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-30 object-fill rounded-t-lg"
                                    />
                                </CardHeader>
                                {/* Card Body */}
                                <CardBody>
                                    <h3 className="text-xl  font-semibold text-gray-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </CardBody>
                                {/* Card Footer */}
                                <CardFooter className="flex justify-end">
                                    {/* <Button color="primary" size="sm"> */}
                                        {/* Request this service */}
                                        <Ambulanceform />
                                    {/* </Button> */}
                                    
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AmbulancePortal;

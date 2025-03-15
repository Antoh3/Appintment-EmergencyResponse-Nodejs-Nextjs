const express = require("express");
const {
    adminLogin,
    adminRegister,
    updateAppointmentById,
    rescheduleAppointment,
    approveAppointment,
    cancelAppointment,
    completeAppointment,
    deleteAppointmentById,
    getAppointments,
    getAppointmentStatus
} = require('../Controllers/AdminController')
const { authenticateToken  }= require("../Middlewares/JWT.authentication");


const AdminRouter = express.Router()


AdminRouter.post("/login",adminLogin)
AdminRouter.post("/register",adminRegister)

// Update an appointment by ID
AdminRouter.put("/:appointmentId",authenticateToken,updateAppointmentById); 
AdminRouter.patch("/rescheduleappointment/:appointmentId",authenticateToken,rescheduleAppointment)  
AdminRouter.patch("/approveappointment/:appointmentId",authenticateToken,approveAppointment)  
AdminRouter.patch("/cancelappointment/:appointmentId",authenticateToken,cancelAppointment)  
AdminRouter.patch("/completeappointment/:appointmentId",authenticateToken,completeAppointment)  
AdminRouter.get("/appointments",authenticateToken,getAppointments)  
AdminRouter.get("/count",authenticateToken,getAppointmentStatus)  

// Delete an appointment by ID
AdminRouter.delete("/:appointmentId",authenticateToken,deleteAppointmentById);


module.exports = AdminRouter
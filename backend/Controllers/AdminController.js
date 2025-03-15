const { generateToken, generateRefreshToken } = require('../Middlewares/JWT.authentication');
const prisma = require('../prisma/prismaClient')
const bcrypt = require('bcrypt')


const adminRegister = async (req, res) => {
    const { email, name, password } = req.body;

    const existingAdmin = await prisma.admin.findUnique({
        where: {
            email: email
        }
    })

    if (existingAdmin) {
        return res.status(400).json("Admin already exixts")
    }

    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds)

    const superadmin = await prisma.admin.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    res.status(200).json({ superadmin, message: "Admin account created" })
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await prisma.admin.findUnique({
            where: {
                email: email
            }
        })

        if (!admin) {
            return res.status(404).json({ message: "Admin does not exist" })
        }

        const comparePassword = await bcrypt.compare(password, admin.password)
        if (!comparePassword) {
            res.status(400).json({ message: "password mismatch" })
        }

        const accessToken = generateToken(admin.id, 'super_admin');
        const refreshToken = generateRefreshToken(admin.id, 'super_admin')


        res.status(200).json({ message: "Login successful", accessToken, refreshToken })

    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateAppointmentById = async (req, res) => {

    try {
        const appointmentId = req.params.appointmentId;
        const { schedule, status, reason, cancelationReason, primaryPhysician } = req.body;
        const userRole = req.userRole;

        let filter = {}

        if (userRole !== 'super_admin') {
            return res.status(403).json({ message: "Forbidden" });
        }

        // Parse schedule to a valid Date object if it's a string
        const parsedSchedule = schedule ? new Date(schedule) : undefined;
        // Validate date format
        if (parsedSchedule && isNaN(parsedSchedule.getTime())) {
            return res.status(400).json({ message: 'Invalid schedule date format' });
        }

        // Check if the appointment with the given ID exists
        const existingAppointment = await prisma.appointment.findUnique({
            where: {
                id: appointmentId
            },
            include: {
                patient: true,
                doctor: true
            }
        })
        if (!existingAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }


        // Extract updated appointment data from req.body
        const updatedAppointment = await prisma.appointment.update({
            where: {
                id: appointmentId
            },
            data: {
                schedule: parsedSchedule || existingAppointment.schedule,
                status: status || existingAppointment.status,
                reason: reason || existingAppointment.reason,
                primaryPhysician: primaryPhysician || existingAppointment.primaryPhysician,
                cancelationReason: cancelationReason || existingAppointment.cancelationReason
            }
        })


        // Send a success response with the updated appointment data
        res.status(200).json(updatedAppointment);
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an appointment by ID
const deleteAppointmentById = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const userRole = req.userRole;

        let filter = {}

        if (userRole !== 'super_admin') {
            return res.status(403).json({ message: "Forbidden" });
        }
        // Check if the appointment with the given ID exists
        const existingAppointment = await prisma.appointment.findUnique({
            where: {
                id: appointmentId
            },
            include: {
                patient: true,
                doctor: true
            }
        })
        if (!existingAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }


        await prisma.appointment.delete({
            where: {
                id: appointmentId
            }
        })


        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const rescheduleAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { schedule } = req.body;
    const userRole = req.userRole;

    let filter = {}

    if (userRole !== 'super_admin') {
        return res.status(403).json({ message: "Forbidden" });
    }


    const findAppintment = await prisma.appointment.findUnique({
        where: {
            id: appointmentId
        }
    })

    if (!findAppintment) {
        return res.status(404).json({ message: "appintmentId not found" });
    }

    const updatedAppointment = await prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            schedule: new Date(schedule),
            status: 'rescheduled'
        }
    })
    console.log(updatedAppointment)
    return res.status(200).json(updatedAppointment)
}

const approveAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body;
    const userRole = req.userRole;


    let filter = {}

    if (userRole !== 'super_admin') {
        return res.status(403).json({ message: "Forbidden" });
    }


    const findAppintment = await prisma.appointment.findUnique({
        where: {
            id: appointmentId
        }
    })

    if (!findAppintment) {
        return res.status(404).json({ message: "appintmentId not found" });
    }

    const updatedAppointment = await prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status
        }
    })
    return res.status(200).json(updatedAppointment)
}

const cancelAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { status, cancelationReason } = req.body;
    const userRole = req.userRole;


    let filter = {}

    if (userRole !== 'super_admin') {
        return res.status(403).json({ message: "Forbidden" });
    }


    const findAppintment = await prisma.appointment.findUnique({
        where: {
            id: appointmentId
        }
    })

    if (!findAppintment) {
        return res.status(404).json({ message: "appintmentId not found" });
    }

    const updatedAppointment = await prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status: "canceled_by_admin",
            cancelationReason
        }
    })
    return res.status(200).json(updatedAppointment)
}

const completeAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    // const { status } = req.body;

    const userRole = req.userRole;

    let filter = {}

    if (userRole !== 'super_admin') {
        return res.status(403).json({ message: "Forbidden" });
    }


    const findAppintment = await prisma.appointment.findUnique({
        where: {
            id: appointmentId
        }
    })

    if (!findAppintment) {
        return res.status(404).json({ message: "appintmentId not found" });
    }

    const updatedAppointment = await prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status: "completed"
        }
    })
    return res.status(200).json(updatedAppointment)
}

const getAppointmentStatus = async (req, res) => {
    // const userId = req.userId;
    const userRole = req.userRole;

    let filter = {}

    if (userRole !== 'super_admin') {
        return res.status(403).json({ message: "Forbidden" });
    }

    // if(userRole === 'doctor'){
    //     filter.doctorId = userId
    // }else if (userRole === 'patient') {
    //     filter.patientId = userId
    // }else{
    //     return res.status(403).json({message:"Unauthorized"});
    // }

    const count = await prisma.appointment.groupBy({
        by: ['status'],
        _count: { status: true },
    })

    const total = await prisma.appointment.count()

    const formattesStatus = count.reduce((acc, curr) => {
        acc[curr.status] = curr._count.status;
        return acc;
    }, {})

    res.status(200).json({
        total: total,
        formattesStatus
    })
}

const getAppointments = async (req, res) => {
    try {
        if (req.userRole !== "super_admin") {
            return res.status(403).json({ message: "Access forbidden" })
        }
        
        const appointments = await prisma.appointment.findMany({
            select: {
                id: true,
                schedule: true,
                status: true,
                // primaryPhysician: true,
                patientName: true,
                reason: true,
                // cancelationReason: true
            },
            orderBy: {
                schedule: "asc"
            }
        })
        res.status(200).json(appointments)
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    adminLogin,
    adminRegister,
    updateAppointmentById,
    cancelAppointment,
    getAppointmentStatus,
    completeAppointment,
    approveAppointment,
    rescheduleAppointment,
    deleteAppointmentById,
    getAppointments
}
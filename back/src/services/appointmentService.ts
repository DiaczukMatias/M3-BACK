import { User } from "./../entities/User";
import { AppDataSource, AppointmentModel } from "../config/data-source";
import { appointmentDTO } from "../dto/appointmentDTO";
import { Appointment } from "../entities/Appointment";

import { appointmentStatus } from "../enums/appointmentStatus";

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  const appointments = await AppointmentModel.find();
  relations: {
    User: true;
  }
  return appointments;
};

export const getAppointmentById = async (
  id: number
): Promise<Appointment | null> => {
  const appointment = await AppointmentModel.findOne({
    where: { id },
    relations: ["user"],
  });
  return appointment;
};

export const scheduleAppointmentService = async (
  appointmentData: appointmentDTO
): Promise<Appointment | null> => {
  const { date, time, userId } = appointmentData;

  const foundUser: User | null = await AppDataSource.getRepository(
    User
  ).findOneBy({ id: userId });

  if (foundUser) {
    const appointment = AppDataSource.getRepository(Appointment).create({
      date,
      time,
      user: foundUser,
      status: appointmentStatus.active,
    });
    const result = await AppDataSource.getRepository(Appointment).save(
      appointment
    );
    return result;
  }
  return null;
};

export const cancelAppointmentService = async (id: number): Promise<string> => {
  const appointment: Appointment | null = await AppointmentModel.findOneBy({
    id,
  });
  if (appointment) {
    appointment.status = appointmentStatus.cancelled;
    await AppointmentModel.save(appointment);
    return "Turno cancelado";
  } else {
    return "El id del turno no existe";
  }
};

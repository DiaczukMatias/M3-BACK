import { Request, Response } from "express";
import {
  getAllAppointmentsService,
  getAppointmentById,
  scheduleAppointmentService,
  cancelAppointmentService,
} from "../services/appointmentService";

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const allAppointments = await getAllAppointmentsService();
    return allAppointments.length
      ? res.status(200).json(allAppointments)
      : res.status(404).json({ message: "no hay turnos" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los turnos." });
  }
};

export const getAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const appointment = await getAppointmentById(Number(id));
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ message: "Turno no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el turno." });
  }
};

export const scheduleAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentData = req.body;
    const newAppointment = await scheduleAppointmentService(appointmentData);
    res.status(200).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error al agendar el turno." });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await cancelAppointmentService(Number(id));
    if (message === "Turno cancelado") {
      res.status(200).send(message);
    } else {
      res.status(404).send({ message: "Error" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al cancelar el turno." });
  }
};

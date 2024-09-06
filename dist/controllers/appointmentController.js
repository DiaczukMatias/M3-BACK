"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointment = exports.getAppointments = void 0;
const appointmentService_1 = require("../services/appointmentService");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAppointments = yield (0, appointmentService_1.getAllAppointmentsService)();
        return allAppointments.length
            ? res.status(200).json(allAppointments)
            : res.status(404).json({ message: "no hay turnos" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los turnos." });
    }
});
exports.getAppointments = getAppointments;
const getAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointment = yield (0, appointmentService_1.getAppointmentById)(Number(id));
        if (appointment) {
            res.status(200).json(appointment);
        }
        else {
            res.status(404).json({ message: "Turno no encontrado." });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el turno." });
    }
});
exports.getAppointment = getAppointment;
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentData = req.body;
        const newAppointment = yield (0, appointmentService_1.scheduleAppointmentService)(appointmentData);
        res.status(200).json(newAppointment);
    }
    catch (error) {
        res.status(500).json({ message: "Error al agendar el turno." });
    }
});
exports.scheduleAppointment = scheduleAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const message = yield (0, appointmentService_1.cancelAppointmentService)(Number(id));
        if (message === "Turno cancelado") {
            res.status(200).send(message);
        }
        else {
            res.status(404).send({ message: "Error" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al cancelar el turno." });
    }
});
exports.cancelAppointment = cancelAppointment;

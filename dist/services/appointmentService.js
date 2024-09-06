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
exports.cancelAppointmentService = exports.scheduleAppointmentService = exports.getAppointmentById = exports.getAllAppointmentsService = void 0;
const User_1 = require("./../entities/User");
const data_source_1 = require("../config/data-source");
const Appointment_1 = require("../entities/Appointment");
const appointmentStatus_1 = require("../enums/appointmentStatus");
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield data_source_1.AppointmentModel.find();
    relations: {
        User: true;
    }
    return appointments;
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield data_source_1.AppointmentModel.findOne({
        where: { id },
        relations: ["user"],
    });
    return appointment;
});
exports.getAppointmentById = getAppointmentById;
const scheduleAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId } = appointmentData;
    const foundUser = yield data_source_1.AppDataSource.getRepository(User_1.User).findOneBy({ id: userId });
    if (foundUser) {
        const appointment = data_source_1.AppDataSource.getRepository(Appointment_1.Appointment).create({
            date,
            time,
            user: foundUser,
            status: appointmentStatus_1.appointmentStatus.active,
        });
        const result = yield data_source_1.AppDataSource.getRepository(Appointment_1.Appointment).save(appointment);
        return result;
    }
    return null;
});
exports.scheduleAppointmentService = scheduleAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield data_source_1.AppointmentModel.findOneBy({
        id,
    });
    if (appointment) {
        appointment.status = appointmentStatus_1.appointmentStatus.cancelled;
        yield data_source_1.AppointmentModel.save(appointment);
        return "Turno cancelado";
    }
    else {
        return "El id del turno no existe";
    }
});
exports.cancelAppointmentService = cancelAppointmentService;

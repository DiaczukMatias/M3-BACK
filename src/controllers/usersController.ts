import { Request, Response } from "express";
import {
  createUserService,
  getAllUsersService,
  getUserById,
} from "../services/usersService";
import { UserDTO } from "../dto/UserDTO";
import { User } from "../entities/User";
import { checkCredentials } from "../services/credentialService";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allUsers: User[] = await getAllUsersService();
    return allUsers.length
      ? res.status(200).json(allUsers)
      : res.status(404).json({ error: "no hay usuarios registrados" });
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener los usuarios." });
  }
};

export const getUsersById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: User | null = await getUserById(Number(id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario." });
  }
};

export const usersRegister = async (req: Request, res: Response) => {
  try {
    const userData: UserDTO = req.body;

    if (
      !userData.name ||
      !userData.email ||
      !userData.birthdate ||
      !userData.nDni ||
      !userData.username ||
      !userData.password
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos." });
    }

    if (
      typeof userData.name !== "string" ||
      typeof userData.email !== "string" ||
      typeof userData.username !== "string" ||
      typeof userData.password !== "string"
    ) {
      return res.status(400).json({
        message:
          "Los campos name, email, username y password deben ser cadenas de texto.",
      });
    }

    const newUser: User = await createUserService(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario." });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;

    const userId = await checkCredentials({ username, password });

    if (userId) {
      const user = await getUserById(userId);
      return res.status(200).json({ login: true, user });
    } else {
      return res.status(400).json({ error: "Datos incorrectos" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

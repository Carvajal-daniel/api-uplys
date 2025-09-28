import { Router } from "express";
import { createUserController } from "../../interface/controllers/user/user-controller";

const router = Router();

router.post('/users', createUserController)

export default router
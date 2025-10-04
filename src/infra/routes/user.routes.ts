import { Router } from "express";
import { createUserController } from "../../interface/controllers/user/user-controller";
import { loginController } from "../../interface/controllers/user/fyndByEmail";

const router = Router();

router.post('/users', createUserController)
router.post('/login', loginController)

export default router
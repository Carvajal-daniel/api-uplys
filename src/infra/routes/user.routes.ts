import { Router } from "express";
import { createUserController } from "../../interface/controllers/user/user-controller";
import { loginController } from "../../interface/controllers/user/findByEmail";
import { authenticate } from "../middlewares/authenticate";
import { dashboardController } from "../../interface/controllers/user/findUserData";

const router = Router();

router.post('/users', createUserController)
router.post('/login', loginController)

router.get('/dashboard', authenticate, dashboardController);


export default router
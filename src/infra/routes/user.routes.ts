import { Router } from "express";
import { createUserController } from "../../interface/controllers/user/user-controller";
import { loginController } from "../../interface/controllers/user/findByEmail";
import { authenticate } from "../middlewares/authenticate";
import { dashboardController } from "../../interface/controllers/user/findUserData";
import { createBusinessController } from "../../interface/controllers/business/create";
import { checkIsActive } from "../middlewares/checkIsActive";

const router = Router();

router.post('/users', createUserController)
router.post('/login', loginController)

//rotas privadas
router.get('/dashboard', authenticate, checkIsActive, dashboardController);
router.post('/business', authenticate, createBusinessController)

export default router
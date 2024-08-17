import { Router } from 'express'
import { registerController, loginController, logoutController } from "../controllers/auth.controller"
const router = Router();

router.post("/auth/register", registerController)
router.post("/auth/login", loginController)
router.get("/auth/logout", logoutController)


export default router;
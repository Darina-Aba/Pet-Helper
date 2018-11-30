import { Router } from "express";
import UserController from "../controllers/user-controller";
import { AuthController } from "../../authentication/controllers/auth-controller";
import CheckRoleMiddleware from "../../server/check-role.middleware";
import { Role } from "../../server/models/role";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/",
            CheckRoleMiddleware.checkRole(Role.Admin),
            UserController.getAllUsers,
        );
        this.router.get("/:id", UserController.getUser);
        this.router.post("/signup", AuthController.signUserUp);
        this.router.post("/login", AuthController.signUserIn);
        this.router.put("/changeOrganisationState",
            CheckRoleMiddleware.checkRole(Role.Admin),
            UserController.changeOrganisationState,
        );
        this.router.delete("/:id", UserController.deleteUser);
        this.router.put("/:id",
            CheckRoleMiddleware.checkRole(Role.User),
            UserController.updateUser,
        );
    }
}

const userRouter = new UserRouter();

export default userRouter.router;

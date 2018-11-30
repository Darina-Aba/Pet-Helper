import { Router } from "express";
import AnnouncementController from "../controllers/announcement-controller";
import CheckRoleMiddleware from "../../server/check-role.middleware";
import { Role } from "../../server/models/role";

class AnnouncementRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/", AnnouncementController.getAllAnnouncements);
        this.router.get("/:id", AnnouncementController.getAnnouncement);
        this.router.post("/",
            CheckRoleMiddleware.checkRole(Role.Admin, Role.User),
            AnnouncementController.addAnnouncement,
        );
        this.router.delete("/:id",
            CheckRoleMiddleware.checkRole(Role.Admin, Role.User),
            AnnouncementController.deleteAnnouncement,
        );
        this.router.put("/:id/approve",
            CheckRoleMiddleware.checkRole(Role.Admin),
            AnnouncementController.approveAnnouncement,
        );
        this.router.put("/:id/changeStatus",
            CheckRoleMiddleware.checkRole(Role.Organisation),
            AnnouncementController.changeAnnouncementStatus,
        );
        this.router.put("/:id",
            CheckRoleMiddleware.checkRole(Role.Admin, Role.User),
            AnnouncementController.updateAnnouncement,
        );
    }
}

const announcementRouter = new AnnouncementRouter();

export default announcementRouter.router;

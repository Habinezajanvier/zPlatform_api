import AuthController from "./auth";
import UserController from "./users";

export default {
    auth: new AuthController(),
    user: new UserController()
}
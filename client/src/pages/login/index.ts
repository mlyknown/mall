
import { WrappedNormalLoginForm } from "./login";
import { BasePageManager, RouteModel } from "../../core/web/pageManger/basePageManager";

export class LoginPageManager extends BasePageManager {
    components = [];
    route: RouteModel = {
        path: '/login',
        name: 'login',
        component: WrappedNormalLoginForm
    }
}

export const loginPageManager = new LoginPageManager()
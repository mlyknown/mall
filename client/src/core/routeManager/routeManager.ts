
import { RouteAdapter } from "./routerDapter";

export class RouterManager {
    routeAdapter: RouteAdapter;
    registerRouteAdapter(adapter: RouteAdapter) {
        this.routeAdapter = adapter;
    }
    push(url: string) {
        this.routeAdapter.push(url);
    }
}

export const routerManger = new RouterManager();
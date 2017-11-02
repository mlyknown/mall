export interface RouteModel {
    path: string;
    component: any;
    title?: string;
    name?: string;
    className?: string;
    children?: RouteModel[];
    url?: string;
    icon?: string;
}

function traversal(target: any[], childrenFiedName: string, key?: string) {
    let result: any[] = []
    target.forEach((x: any) => {
        result = result.concat(key && x[key] || x)
        if (Array.isArray(x[childrenFiedName])) {
            result = result.concat(traversal(x[childrenFiedName], childrenFiedName, key))
        }
    })
    return result
}

// 比如baseCompentContainer没有内容，应该怎么写
export abstract class BasePageManager {
    abstract components: Array<any>
    abstract route: RouteModel; // ? null
    public getAllRouteModels() {
        return traversal([this.route], 'component')
    }

    public getPathByComponentName(name: string) {
        return this.getAllRouteModels().find(x => x.name === name).path;
    }
}
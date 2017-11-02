import { Subscription } from 'rxjs'
import * as React from "react";
import { IbaseComponent } from "./baseComponent";

interface Action {
    name: string,
    args: Array<any>
}

const Permissions = ["1", "2"]

export function Permission(s: string = '') {
    return function (target: any) {
        if (!s || Permissions.indexOf(s) > -1) {
            return
        }
        target.prototype.render = () => null
    }
}

// export const HoC = (WrappedComponent: any, props: any) => {
//     const WrappingComponent = () => (
//         <div className="foo">
//             <WrappedComponent {...props} />
//         </div>
//     )
//     return <WrappingComponent />;
// }

// export const HoC = (WrappedComponent:any) => {
//     return class extends React.Component<any, any> {
//         constructor(props:any) {
//           super(props)
//         }
//         render () {
//             return <WrappedComponent />
//         }
//     }
// }

export function permission(s: string, Cmp: any) {
    if (Permissions.indexOf(s) === -1) {
        return null
    }
    return Cmp
}

export class BaseComponent<P = {}, S = {}>
    extends React.Component<P & { action?: Action }, S> implements IbaseComponent {
    subscriptions: Array<Subscription> = [];

    constructor() {
        super()
    }

    componentwillreceiveprops(nextProps: P & { action?: Action }) {
        const action = nextProps.action
        if (action && action.name) {
            this[action.name](...(action.args || []))
        }
    }

    componentDidCatch(error: any, info: any) {
        alert('componentDidCatch')
    }

    unsubscribeSubscribetions() {
        this.subscriptions.forEach(subscribetion => subscribetion.unsubscribe());
    }

    trackBy(index: number, item: any) {
        return item.id || item.key || index;
    }

    destory() {
        this.unsubscribeSubscribetions();
    }

    componentWillUnmount() {
        this.destory();
    }
}
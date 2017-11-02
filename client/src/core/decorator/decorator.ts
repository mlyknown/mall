import { autobind } from "core-decorators";

export function ViewOperation() {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        const oldValue = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const self = this;
            try {
                const state = await (oldValue && oldValue.apply(self, args))
                if (state) {
                    (<any> self).setState(state)
                }
                return state
            } catch (error) {
                alert(error)
            }
            // return Promise.resolve().then(() => oldValue && oldValue.apply(self, args)).catch(error => {
            //     debugger
            //     return Promise.resolve(1)
            // }).then(() => 1)
            // return oldValue && oldValue.apply(self, args)
        }
        const newDescriptor = autobind(target, propertyKey, descriptor);
        return newDescriptor
    }
}

// export function mixins(...list:any[]) {
//   return function (target) {
//     Object.assign(target.prototype, ...list)
//   }
// }

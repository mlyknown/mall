import { Subscription } from 'rxjs'

export interface IbaseComponent {
    subscriptions:Array<Subscription>
    destory(): any
    trackBy(index: number, item: any):string
}

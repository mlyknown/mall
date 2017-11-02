import * as React from 'react';
import { BaseComponent, Permission } from '../core/web/baseComponent/react';
import { ViewOperation } from '../core/decorator/decorator';

class AuthState {
    xx: string = ""
}

@Permission("1")
export class Auth extends BaseComponent<null, AuthState> {
    state = new AuthState()
    @ViewOperation()
    handle() {
        return { xx: this.state.xx + "x" }
    }
    render() {
        return (
            <div onClick={this.handle}>1 {this.props.children} {this.state.xx}</div>
        );
    }
}

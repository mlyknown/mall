import * as React from 'react';
import './App.css';
import {
  Route, BrowserRouter
} from 'react-router-dom';
import { routerManger } from "./core/routeManager/routeManager";
import { loginPageManager } from "./pages/login/index";
import { RouteAdapter } from "./core/routeManager/routerDapter";
import { permission } from './core/web/baseComponent/react';
import { Auth } from './pages/auth';

class App extends React.Component<any, any> {
  routerRef: any
  componentDidMount() {
    const { history } = this.routerRef;
    const routeAdapter: RouteAdapter = {
      push(url: string) {
        history.push(url)
      }
    }
    routerManger.registerRouteAdapter(routeAdapter)
  }
  render() {
    const routes = [loginPageManager.route]
    return (
      <div className="App">
        <BrowserRouter ref={(router: any) => this.routerRef = router}>
          <div> {
            routes.map(route => <Route key={route.path} path={route.path} component={route.component} />)}
            <Route path="/12" component={() => (<div>12</div>)} />
          </div>
        </BrowserRouter>
        {permission("1", <Auth>123</Auth>)}
      </div>
    );
  }
}

export default App;

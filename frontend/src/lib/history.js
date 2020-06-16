import { createBrowserHistory } from 'history';
import * as conf from "./conf";

console.log(conf.baseRouteURL);
export default createBrowserHistory({ basename: conf.baseRouteURL });
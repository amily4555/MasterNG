import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class MnReqService {
    progress$: BehaviorSubject<any>;
    progress_: number;
    progress: any;
    /**
     * httpInterceptor headers
     */
    _headers: any;
    setHeaders(headers: any): void;
    getHeaders(fn?: any): any;
    /**
     * resource
     */
    _resources: any;
    setResources(resources: any): void;
    getResources(fn?: any): any;
    reqCatch: any;
    reqError: any;
    constructor();
}

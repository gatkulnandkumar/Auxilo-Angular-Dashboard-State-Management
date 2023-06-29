import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetAllConstants, GetAllService, GetAllServiceLogs } from './auxilo.action';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logs } from '../components/Model/logs.model';
import { Constants } from '../components/Model/constants.model';
import { SharedServiceService } from '../components/services/shared-service.service';
import { globalUrl } from '../globalUrl';
// import { Constants } from '../Model/constants.model';
// import { SharedServiceService } from '../services/shared-service.service';
// import { Logs } from '../Model/logs.model';

export interface ServiceLogStateModel {
    serviceLogs: Logs[];
    serviceLogsLoded: boolean,
    selectedServiceLog: Logs[] | null
}

export interface ConstantStateModel {
    constantLogs: Constants[];
    constantLogsLoaded: boolean
}

// export interface AllServiceLogsStateModel{
//     allServiceLogs : Logs[];
//     allServiceLogsLoaded: boolean;
// }

@State<ServiceLogStateModel>({
    name: 'serviceLogssssss',
    defaults: {
        serviceLogs: [],
        serviceLogsLoded: false,
        selectedServiceLog: []
    }
})

@Injectable()
export class ServiceLogState {
    constructor(private sharedService: SharedServiceService) { }

    // @Selector()
    // static getServiceLogs(state: ServiceLogStateModel) {
    //     return state.selectedServiceLog;
    // }

    // @Selector()
    // static getServiceLogsLoded(state: ServiceLogStateModel) {
    //     return state.serviceLogsLoded;
    // }


    // @Action(GetAllServiceLogs)
    // getAllServiceLogs({ getState, setState }: StateContext<ServiceLogStateModel>, action: GetAllServiceLogs) {
    //     console.log("GetAllServiceLogs insideeeeeee");
    //     this.sharedService.getServiceLogByTableName(action.tableName, action.serviceType).pipe(tap(res => {
    //         console.log("in state res getServiceLogByTableName",res);
    //         const state = getState();
    //         console.log("Stateeeee",state);

    //         setState({
    //             ...state,
    //             serviceLogs: res,
    //             serviceLogsLoded:true
    //         })
    //     }))
    // }


    @Selector()
    static getServiceLog(state: ServiceLogStateModel) {
        return state.serviceLogs;
    }

    @Selector()
    static getServiceLogLoded(state: ServiceLogStateModel) {
        return state.serviceLogsLoded;
    }

    @Action(GetAllService)
    getAllService({ getState, setState }: StateContext<ServiceLogStateModel>, action: GetAllService) {
        console.log("State Action here");
        return this.sharedService.getServiceLog(globalUrl.fetchallServiceLogUrl).pipe(tap(res => {
            console.log("Tap res", res);
            const state = getState();
            console.log("getServiceLog[] state==>", state);

            setState({
                ...state,
                serviceLogs: res,
                serviceLogsLoded: true
            })
        }))
    }

    @Selector()
    static getConstantLogs(state: ConstantStateModel) {
        return state.constantLogs;
    }
    //get loaded
    @Selector()
    static getConstantLogloaded(state: ConstantStateModel) {
        return state.constantLogsLoaded;
    }
    @Action(GetAllConstants)
    getAllConstants({ getState, setState }: StateContext<ConstantStateModel>) {
        return this.sharedService.getData(globalUrl.getAllConstantsUrl).pipe(tap(res => {
            console.log("ressssss constants", res);
            const state = getState();
            setState({
                ...state,
                constantLogs: res,
                constantLogsLoaded: true
            })
        }))
    }
}

export { GetAllServiceLogs, GetAllConstants };
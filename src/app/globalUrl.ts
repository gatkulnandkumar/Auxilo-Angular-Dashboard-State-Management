import { OnInit, Directive } from '@angular/core';
// import configJson from "src/config.json"
// import configJson from 'src/assets/config.json';

import configJson from 'src/assets/config.json'

@Directive()
export class globalUrl implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
    public static signInUrl = configJson.signInUrl;
    public static signIn = globalUrl.signInUrl + '/signin';

    public static gateWayUrl = configJson.gateWayUrl;
    public static getAllConstantsUrl = configJson.gateWayUrl + '/fetchAllConstants';

    public static getDataByTableNameUrl = configJson.gateWayUrl + '/fetchAllConstants';

    public static updateServiceUrl = configJson.gateWayUrl + '/updateConstant';

    public static fetchallServiceLogUrl = configJson.gateWayUrl + '/fetchallServiceLog';

    public static getServiceLogFilterUrl = configJson.gateWayUrl + '/fetchServiceLogByDateRange';
    
    public static fetchallAuditLogUrl = configJson.gateWayUrl + '/fetchallAuditLog';
    

}

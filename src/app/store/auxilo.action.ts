export class GetAllServiceLogs {
    static readonly type = '[ServiceLogs] Get All Service Logs Tabel';
    constructor(public tableName: any, public serviceType: any) {}
  }

  export class GetAllService {
    static readonly type = '[ServiceLogs] Get All Service';

  }

  export class GetAllConstants {
    static readonly type = '[Constants] Get All Constants';
  }

  
  
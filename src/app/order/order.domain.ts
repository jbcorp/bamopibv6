export class OrderDetail {
    id: number;
    checked?:boolean;
    createdAt: number;
    createdBy: string;
    updatedAt: number;
    updatedBy: string;
    siebelOrderId: string;
    siebelOrderNumber: string;
    customer?: any;
    orderType: string;
    //siebelCreationDate: string;
    siebelCreationDate: any;
    siebelOrderDetails: SiebelOrderDetails;
    fusionOrderDetails: FusionOrderDetails;
    cordysOrderDetails: CordysOrderDetails;
    corrections?: Corrections;
    
    links?: Link[];
    managed?: boolean;
    showCordysDetails? : boolean;
   
    isCordysDetailsLoaded? : boolean;
    
}

export interface SiebelOrderDetails {
    siebelStatus: string;
    revenue?: number;
}

export interface FusionOrderDetails {
    fusionStatus: string;
}

export interface CordysOrderDetails {
    comOrderId?: any;
    cordysDerivedStatus?: any;
    cordysStatus?: any;
    functionalProducts?: FunctionalProduct[];
}


export interface FunctionalProduct {
    action?:any;
    comOrderId?:any;
    functionalProductStatus?:any;
    functionalProductType?:any;
    id?:any;
    identifier?:any;
    orderLineId?:any;
    sniInputXml?:any;
    sniOrderId?:any;
    sniOutputXml?:any;
    isChecked?:boolean;
}

export class Corrections {
        siebelAcknowledged: boolean;
        cordysAcknowledged: boolean;
        fusionAcknowledged: boolean;
        siebelCorrected: boolean;
        cordysCorrected: boolean;
        fusionCorrected: boolean;
        eta?: any;
        workaround?: any;
        comment?: any;
        changed: boolean;
       correctionTime: Date;
    }

export interface Link {
        url: string;
        rel: string;
}

export interface Customer {
        id: number;
        ckrNumber: string;
        accountName: string;
        managed: boolean;
    }
    export var DropDownSystem = {
    FUSION: "Fusion",
    CORDYS: "Cordys",
    SIEBEL: "Siebel",
    System:"Select System"
   
}
export var CordysFunctionalProductStatus = {
    //Green   
    SNI_PROVISIONED     : "SNI_PROVISIONED",
    CANCELLED_CRM       : "CANCELLED_CRM",
    SNI_CANCELLED       : "SNI_CANCELLED",
    CANCELLED_CRM_AFPROV: "CANCELLED_CRM_AFPROV",
    SNI_CANCELLED_BY_COM: "SNI_CANCELLED_BY_COM",
    CANCELLED_CRM_DUPROV: "CANCELLED_CRM_DUPROV",

    //Red(End Status with some issues)
    COM_ERROR   : "COM_ERROR",
    SNI_REJECT  : "SNI_REJECT",
    SNI_ERROR   : "SNI_ERROR",
    SNI_TIMEOUT : "SNI_TIMEOUT",
    TECH_ERROR  : "TECH_ERROR", 
 
   // Amber(middle status)
    NOT_REQUESTED    : "NOT_REQUESTED",
    RETRY_SENT       : "RETRY_SENT",
    WAIT_PORTING_SYNC: "WAIT_PORTING_SYNC",
    INITIAL          : "INITIAL",
    SENT_TO_SNI      : "SENT_TO_SNI",
    PORT_ANS_RECD    : "PORT_ANS_RECD",
    SNI_IN_PROC      : "SNI_IN_PROC",
    PLN_RECD         : "PLN_RECD", 
    COM_IN_PROC      : "COM_IN_PROC",
    PLN_COMPLETE     : "PLN_COMPLETE",
    PORTING_SYNC     : "PORTING_SYNC",
    

}
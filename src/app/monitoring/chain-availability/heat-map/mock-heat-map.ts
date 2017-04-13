import {HeatMap} from '../module/heat-map';

export const HEATMAP: HeatMap[] = [
	{ nodeID:'Node1', status:'OK', timeStamp:new Date(), httpCode:'200', appType:'CORDYS', colorCode:'yellow',chainStatus:'Success'},
	{ nodeID:'Node2', status:'UNKNOWN', timeStamp:new Date(), httpCode:'200', appType:'CORDYS', colorCode:'yellow',chainStatus:'Success'},
	
	{ nodeID:'Node1', status:'NOTOK', timeStamp:new Date(), httpCode:'200',appType:'FUSION', colorCode:'yellow',chainStatus:'Success'},
	{ nodeID:'Node2', status:'UNKNOWN', timeStamp:new Date(),   httpCode:'200',appType:'FUSION', colorCode:'yellow',chainStatus:'Success'},

	{ nodeID:'Node1', status:'OK', timeStamp:new Date(),  httpCode:'200',appType:'ONECRM',colorCode:'yellow',chainStatus:'Success'},
	{ nodeID:'Node2', status:'UNKNOWN',timeStamp:new Date(),  httpCode:'200',appType:'ONECRM',colorCode:'yellow',chainStatus:'Success'},
	{ nodeID:'Node1', status:'OK', timeStamp:new Date(),   httpCode:'200',appType:'SNIWEBSERVICES', colorCode:'yellow',chainStatus:'Success'},
	{ nodeID:'Node2', status:'OK',timeStamp:new Date(),    httpCode:'200',appType:'SNIWEBSERVICES', colorCode:'yellow',chainStatus:'Success'},

	{ nodeID:'Node1', status:'NOTOK',timeStamp:new Date(),   httpCode:'200', appType:'XILLIONS', colorCode:'yellow',chainStatus:'Success'},
	{ nodeID:'Node2', status:'NOTOK',timeStamp:new Date(),   httpCode:'200', appType:'XILLIONS', colorCode:'yellow',chainStatus:'Success'}
	
];
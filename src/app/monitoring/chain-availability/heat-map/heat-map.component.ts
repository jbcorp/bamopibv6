import { Component, OnInit, Input } from '@angular/core';
import { HeatMapService } from '../services/heat-map.service';
import {HeatMap} from '../module/heat-map';


@Component(
  {
    //moduleId: module.id,
    selector: 'app-heat-map',
    templateUrl: 'heat-map.component.html',
    styleUrls: ['heat-map.component.css'],
    providers: [HeatMapService],
  })

export class HeatMapComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string = '';
  chainStatus: String = "";
  cordysList: HeatMap[] = [];
  heatMapList: HeatMap[] = [];
  onecrmList: HeatMap[] = [];
  fusionList: HeatMap[] = [];
  sniList: HeatMap[] = [];
  xilionsList: HeatMap[] = [];

  //To switch the call from HTTP or Mock
 // environmentName: boolean = environment.production;

  constructor(private service: HeatMapService) {
  }

  ngOnInit() {
    this.isLoading = true;
    //this below variable set in environment file when anyone want to make http call they needs to build with
    // command:- ng s -prod or change the value of production from environment.ts for temp 
   // if (this.environmentName) {
      this.getDataFromBackend();
    //} else {
      //this.getDatafromMock()
    //}
  }

  //Call brings the data from Mock Call
  getDatafromMock() {
    //this.heatMapList = this.service.getHeatMapWithMockData();
    this.setSystemNode();
    this.isLoading = false
  }

  //Call brings the data from HTTP Call
  getDataFromBackend() {
    this.service.getHeatMapData().subscribe(
      item => {
        //console.log("data in component " + item);
        this.heatMapList = item;
        this.setSystemNode();
      },
      error => {
        //console.error("Error in getHeatMapData call " + error);
      },
      () => (this.isLoading = false)
    );
  }

  //set all node from different system on the basis of type
  setSystemNode() {
    this.cordysList = this.getHeatMap("CORDYS");
    this.onecrmList = this.getHeatMap("ONECRM");
    this.fusionList = this.getHeatMap("FUSION");
    this.sniList = this.getHeatMap("SNIWEBSERVICES");
    this.xilionsList = this.getHeatMap("XILLIONS");
  }

  getHeatMap(hType: String) {
    //return this.heatMapList;
    return this.heatMapList.filter((item) => (item.appType === hType));
  }

  //set color of the each node
  getStatusCss(status: String, chainStatus: String) {
    //CSS class
    let classes: any;
    //If right side expression (value) is true, add the respective CSS class (key)
    classes = {
      'danger1': status === 'NOTOK',
      'warning1': (status === 'UNKNOWN')
    };
    //set default status if not failed
    if ((status !== 'NOTOK') && (status !== 'UNKNOWN')) {
      classes = { 'success1': true }
    }
    return classes;
  }

  //set the overall status of system by looking the status value of each node of the system
  getOneCRMStatusCss() {
    let classes: any;
    var cntNOK = 0;
    var cntOK = 0;
    this.chainStatus = 'InProgress';
    classes = {
      'label-warning': this.chainStatus === 'InProgress'
    }
    this.onecrmList.forEach(cordysList => {

      if (cordysList.status === 'NOTOK') {
        cntNOK++;
        this.chainStatus = 'Failed';
      } else if (cordysList.status === 'OK') {
        cntOK++;
        this.chainStatus = 'Success';
      }
    });
    if (cntNOK === this.onecrmList.length) {
      classes = {
        'label-danger': this.chainStatus === 'Failed',
        'label-success': (this.chainStatus === 'Success'),
        'label-warning': this.chainStatus === 'InProgress'
      }
    }
    if (cntOK === this.onecrmList.length) {
      classes = {
        'label-danger': this.chainStatus === 'Failed',
        'label-success': (this.chainStatus === 'Success'),
        'label-warning': this.chainStatus === 'InProgress'
      }
    }
    return classes;
  }

  getFusionStatusCss() {
    let classes: any;
    var cnt = 0;
    var cntOK = 0;
    this.chainStatus = 'InProgress';
    classes = {
      'label-warning': this.chainStatus === 'InProgress'
    }
    this.fusionList.forEach(cordysList => {

      if (cordysList.status === 'NOTOK') {
        cnt++;
        this.chainStatus = 'Failed';
      } else if (cordysList.status === 'OK') {
        cntOK++;
        this.chainStatus = 'Success';
      }
    });
    if (cnt === this.fusionList.length) {
      classes = {
        'label-danger': this.chainStatus === 'Failed',
        'label-success': (this.chainStatus === 'Success'),
        'label-warning': this.chainStatus === 'InProgress'
      }
    }
    if (cntOK === this.fusionList.length) {
      classes = {
        'label-danger': this.chainStatus === 'Failed',
        'label-success': (this.chainStatus === 'Success'),
        'label-warning': this.chainStatus === 'InProgress'
      }
    }
    return classes;

  }

  getCordysStatusCss() {
    let classes: any;
    var cnt = 0;
    var cntOK = 0;
    this.chainStatus = 'InProgress';
    classes = {
      'label-warning': this.chainStatus === 'InProgress'
    }
    this.cordysList.forEach(cordysList => {

      if (cordysList.status === 'NOTOK') {
        cnt++;
        this.chainStatus = 'Failed';
      } else if (cordysList.status === 'OK') {
        cntOK++;
        this.chainStatus = 'Success';
      }
    });
    if (cnt === this.cordysList.length) {
      classes = {
        'label-danger': this.chainStatus === 'Failed',
        'label-success': (this.chainStatus === 'Success'),
        'label-warning': this.chainStatus === 'InProgress'
      }
    }
    if (cntOK === this.cordysList.length) {
      classes = {
        'label-danger': this.chainStatus === 'Failed',
        'label-success': (this.chainStatus === 'Success'),
        'label-warning': this.chainStatus === 'InProgress'
      }
    }
    return classes;

  }
  getSniStatusCss() {
    let classes: any;
    var cnt = 0;
    var cntOK = 0;
    this.chainStatus = 'InProgress';
    classes = {
      'label-warning': this.chainStatus === 'InProgress'
    }
    this.sniList.forEach(cordysList => {

      if (cordysList.status === 'NOTOK') {
        cnt++;
        this.chainStatus = 'Failed';
      } else if (cordysList.status === 'OK') {
        cntOK++;
        this.chainStatus = 'Success';
      }
    });
    if (cnt === this.sniList.length) {
      classes = {
        'label-danger': this.chainStatus === 'Failed',
        'label-success': (this.chainStatus === 'Success'),
        'label-warning': this.chainStatus === 'InProgress'
      }
    }
    if (cntOK === this.sniList.length) {
      classes = {
        'label-danger': this.chainStatus === 'Failed',
        'label-success': (this.chainStatus === 'Success'),
        'label-warning': this.chainStatus === 'InProgress'
      }
    }
    return classes;

  }

  getXilionsStatusCss() {
    let classes: any;
    var cnt = 0;
    var cntOK = 0;
    this.chainStatus = 'InProgress';
    classes = {
      'label-warning': this.chainStatus === 'InProgress'
    }
    this.xilionsList.forEach(cordysList => {

      if (cordysList.status === 'NOTOK') {
        cnt++;
        this.chainStatus = 'Failed';
      } else if (cordysList.status === 'OK') {
        cntOK++;
        this.chainStatus = 'Success';
      }
    });
    if (cnt === this.sniList.length) {
      classes = {
        'label-danger': this.chainStatus === 'Failed',
        'label-success': (this.chainStatus === 'Success'),
        'label-warning': this.chainStatus === 'InProgress'
      }
    }
    if (cntOK === this.sniList.length) {
      classes = {
        'label-danger': this.chainStatus === 'Failed',
        'label-success': (this.chainStatus === 'Success'),
        'label-warning': this.chainStatus === 'InProgress'
      }
    }
    return classes;

  }

  getCCSClasses() {
    let classes = {
      'label-danger': this.chainStatus === 'Failed',
      'label-success': (this.chainStatus === 'Success'),
      'label-warning': this.chainStatus === 'InProgress'
    }
    return classes;
  }
}

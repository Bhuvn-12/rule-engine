import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from '../../app.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-sidebar]',
  templateUrl: './app-sidebar.component.html'
})
// tslint:disable-next-line: component-class-suffix
export class AppSidebar implements OnInit {
  resourceMap = {
    home: 'RE1', reports: 'RE2', adjustment: 'RE3', sources: 'RE4', operations: 'RE5',
    sadaccount: 'RE6', saduser: 'RE7', sadrole: 'RE8', sadpermission: 'RE9', sconorg: 'RE11',
    sconpgroup: 'RE12', sconledger: 'RE13', sconactl: 'RE14', sconrefdata: 'RE15', sconpros: 'RE16', sconops: 'RE17',
    sconrpt: 'RE18'
  };
  showLinkMap = {
    home: true, reports: true, adjustment: false, sources: false, operations: false,
    sadaccount: false, saduser: false, sadrole: false, sadpermission: false, sconorg: false,
    sconpgroup: false, sconledger: false, sconactl: false, sconrefdata: false, sconpros: false, sconops: false,
    sconrpt: false
  };
  imgURL;
  user_fname;
  user_lname;
  // tslint:disable-next-line: use-life-cycle-interface
  constructor(private sanitizer: DomSanitizer, private appService: AppService, ) {
  }
  async ngOnInit() {
    this.imgURL = this.appService.imgURL;
    // const resourceArr = JSON.parse(localStorage.getItem('resourceArr'));
    // console.log(resourceArr);
/*     this.imgURL = this.appService.imgURL;
    const usrObj = JSON.parse(localStorage.getItem('usrDtls'));
    await this.getUserInfo(usrObj);
    const resp = await this.layoutService.getUserImage(usrObj.user_id);
    if (resp) {
      const unsafeImageUrl = window.URL.createObjectURL(resp); // URL.createObjectURL(res);
      this.imgURL = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
      this.layoutService.imgURL = this.imgURL;
      this.appService.imgURL = this.imgURL;
    } */

  }
  async getUserInfo(usrObj) {
    // const usrObj = JSON.parse(localStorage.getItem('usrDtls'));
/*     const resp = await this.profileService.getUserDetails(usrObj.user_id)
    if (resp) {
      this.user_fname = resp[0].f_name;
      this.user_lname = resp[0].l_name;
      return true;
    } */
  }
}

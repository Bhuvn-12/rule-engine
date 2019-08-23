import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';



declare var $: any;
@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-header]',
  templateUrl: './app-header.component.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppHeader implements OnInit {

  constructor( private appService: AppService, private sanitizer: DomSanitizer, private router: Router) { }

  entArr = [];
  imgURL;
  selected_ent;


  async ngOnInit() {
    this.imgURL = this.appService.imgURL;
    // this.setImage();
    this.makeEntityArr();
    this.appService.AddEntity.subscribe(is_true => {
      this.makeEntityArr();
    });
  }

  iconchane() {
    if ($('#myArrow').attr('class') === 'fas fa-chevron-circle-left') {
      $('#myArrow').removeClass('fas fa-chevron-circle-left').addClass('fas fa-chevron-circle-right');
    } else {
      $('#myArrow').removeClass('fas fa-chevron-circle-right').addClass('fas fa-chevron-circle-left');
    }
  }

  logout() {
    // this.loginService.logout();
  }


  makeEntityArr() {
/*     const entdtls = JSON.parse(localStorage.getItem('entDtls'));
    this.appService.entArr.length = 0;
    for (let i = 0; i < entdtls.length; i++) {
      this.entArr[i] = entdtls[i];
      this.appService.entArr[i] = entdtls[i];
      if (i === 0) {
        this.selected_ent = entdtls[i];
        this.appService.selected_ent = entdtls[i];
        this.appService.resourceArr = entdtls[i].resource_info;
      }
    } */
    // this.contbalService.resetAll();
  }




  // change Entity
  changeEntity(event, isIt) {
    const entdtls = JSON.parse(localStorage.getItem('entDtls'));
    for (let i = 0; i < entdtls.length; i++) {
      this.entArr[i] = entdtls[i];
      this.appService.entArr[i] = entdtls[i];
      if (entdtls[i].ent_cd === event.value.ent_cd) {
        this.selected_ent = entdtls[i];
        this.appService.selected_ent = entdtls[i];
        this.appService.resourceArr = entdtls[i].resource_info;
        // localStorage.removeItem('resourceArr');
        localStorage.setItem('resourceArr', JSON.stringify(this.appService.resourceArr));
        // console.log(this.appService.resourceArr)
        this.appService.ent_cd = event.value.ent_cd;
        this.router.navigate(['/home']);
      }
    }
  }

  // set image profile
  async setImage() {
/*     const usrObj = JSON.parse(localStorage.getItem('usrDtls'));
    const resp = await this.accountService.getImage(usrObj.acct_id);
    if (resp) {
      const unsafeImageUrl = window.URL.createObjectURL(resp);
      this.imgURL = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);

    } */
  }


}

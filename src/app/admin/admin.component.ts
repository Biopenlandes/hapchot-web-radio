import { Component, OnInit } from '@angular/core';

import { AuthService }      from './login/auth.service';
import { Router } from '@angular/router';
import { AdminItemConfigService, AdminItemConfig } from './shared/admin-item-config.module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  itemConfigList : AdminItemConfig[];

  constructor(private authService : AuthService, 
              private router : Router,
              private itemConfService: AdminItemConfigService) {  }

  ngOnInit() {
    this.itemConfigList = this.itemConfService.getConfigs();
  }

  logout()
  {
    this.authService.logout();
    console.log("logout " + this.authService.isLoggedIn);
    this.router.navigate(['/']);
  }

}

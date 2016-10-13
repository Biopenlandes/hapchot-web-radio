import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/database.service';
import { Hangout } from '../entity/hangout';

@Component({
  selector: 'app-hangouts-grid',
  templateUrl: './hangouts-grid.component.html',
  styleUrls: ['./hangouts-grid.component.scss']
})
export class HangoutsGridComponent implements OnInit {

  hangouts : Hangout[] = [];

  constructor(private db :DatabaseService) { }

  ngOnInit() {
    this.db.getHangouts().subscribe(hangouts => this.hangouts = hangouts);
  }

}

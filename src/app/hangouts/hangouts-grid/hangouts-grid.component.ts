import { Component, OnInit } from '@angular/core';
import { Router }         from '@angular/router';

import { DatabaseService }from '../../shared/database.service';
import { Hangout }        from '../entity/hangout';

@Component({
  selector: 'app-hangouts-grid',
  templateUrl: './hangouts-grid.component.html',
  styleUrls: ['./hangouts-grid.component.scss']
})
export class HangoutsGridComponent implements OnInit {

  hangouts : Hangout[] = [];

  constructor(private db :DatabaseService,private router:Router) { }

  ngOnInit() {
    this.db.getHangouts(5).subscribe(hangouts => this.hangouts = hangouts);
  }

  formatDate(timestamp : number)
  {
    if (!timestamp) return "";
    var options = {weekday: "long", month: "long", day: "numeric"};
    return new Date(timestamp).toLocaleDateString("fr-FR", options);
  }

  onClick(hangout:Hangout)
  {
    this.router.navigate(['/evenement',hangout.slug]);
  }

}

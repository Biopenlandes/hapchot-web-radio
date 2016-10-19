import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }         from '@angular/router';

import { DatabaseService }from '../../shared/database.service';
import { Hangout }        from '../entity/hangout';

@Component({
  selector: 'app-hangout',
  templateUrl: './hangout.component.html',
  styleUrls: ['./hangout.component.scss']
})
export class HangoutComponent implements OnInit {

  hangout: Hangout = new Hangout();

  constructor(private route: ActivatedRoute, 
              private db : DatabaseService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => 
    {
       let slug = params['slug']; 
       this.db.getHangoutFromSlug(slug).subscribe(hangout => 
       {
           this.hangout = hangout;
           console.log("hangout", hangout);
           if (hangout.content) document.getElementById("content").innerHTML = hangout.content;
       });
    });
  }

  formatDate(timestamp : number)
  {
    if (!timestamp) return "";
    var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    return new Date(timestamp).toLocaleDateString("fr-FR", options);
  }

}

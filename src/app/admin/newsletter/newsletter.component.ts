import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/database.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  addresses : string[] = [];

  constructor(private db : DatabaseService) { }

  ngOnInit() {
    this.db.getNewsletterAdresses().subscribe(value => {this.addresses = value; console.log(value);});
  }

  onDelete()
  {
    if (confirm("T'es sûr t'as bien tout copié?"))
    {
      this.db.deleteNewsletterAdresses();
    }
  }

}

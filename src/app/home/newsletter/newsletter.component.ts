import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/database.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  validationInfo : string;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
  }

  addAdress(mail : string)
  {
    console.log("address", mail);
    if (this.validateEmail(mail))
    {
      this.db.addNewsletterAddress(mail);
      this.validationInfo = "Ajouté !";
    }
    else
    {
      this.validationInfo = "Adresse invalide";
    }   
    setTimeout( () => this.validationInfo = '', 2000);
  }

  private validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}

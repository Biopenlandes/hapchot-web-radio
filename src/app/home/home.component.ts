import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../shared/database.service';
import { Theme } from '../podcasts/entity/theme';
import { Hangout } from '../hangouts/entity/hangout';

declare var $ : any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // fake actu
  item = { title : "Le cri du pihnada",
  description : "L'actu locale en pays tarusate. Retrouvez nous tous les mercredi de 16h à 19h. Plus d'infos dans la rubrique emission et voila mon texte est trop long",
            pictures : { medium : "assets/uploads/medium/c90611_5de2cc0417714e73acb8da59f843702f.png"} 
         }

  themes : Theme[] = [];
  hangouts : Hangout[] = [];


  constructor(private db :DatabaseService) { }

  ngOnInit() {
    this.db.getThemes().subscribe(themes => {console.log("themes",themes);this.themes = themes;});
    this.db.getHangouts().subscribe(hangouts => this.hangouts = hangouts);
  }

  nextSlide()
  {

  }

}

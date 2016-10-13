import { Component, OnInit } from '@angular/core';
import { AdmnistrableItem } from '../../shared/administrable-item';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  // fake actu
  item = { title : "Le cri du pihnada",
  description : "L'actu locale en pays tarusate. Retrouvez nous tous les mercredi de 16h à 19h. Plus d'infos dans la rubrique emission et voila mon texte est trop long",
            pictures : { medium : "assets/img/jardin.png"} 
  }

  items : AdmnistrableItem[] = [];
  constructor() { }

  ngOnInit() {
    
  }

}

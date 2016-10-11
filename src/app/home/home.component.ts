import { Component, OnInit } from '@angular/core';



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
  constructor() { }

  ngOnInit() {
  }

  nextSlide()
  {

  }

}

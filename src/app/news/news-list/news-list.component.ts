import { Component, OnInit } from '@angular/core';
import { AdmnistrableItem } from '../../shared/administrable-item';
import { DatabaseService } from '../../shared/database.service';
declare var $ : any;
declare var PureJSCarousel : any;

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  carousel : any;
  resizeTimer : any;

  // fake actu
  item = { title : "Le cri du pihnada",
  description : "L'actu locale en pays tarusate. Retrouvez nous tous les mercredi de 16h à 19h. Plus d'infos dans la rubrique emission et voila mon texte est trop long",
            pictures : { medium : "assets/img/jardin.png"} 
  }

  items : AdmnistrableItem[] = [];
  
  constructor(private db : DatabaseService) { }

  ngOnInit() 
  {    
    

    $(window).on('resize', () =>
    {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => this.initCarousel(), 250);
    });

    this.initCarousel();    

    $('#slider').hover(
      ()=> this.carousel.stopAutoPlay(),
      ()=> this.carousel.startAutoPlay('next')
    );    
  }

  private initCarousel()
  {
    $('.slide').css('width',$('#slider').width());
    
    if (this.carousel) this.carousel.destroy();
    this.carousel = new PureJSCarousel({
      carousel: '#slider',
      slide: '.slide',
      oneByOne : true,
      autoplay : true,
      autoplayDelay : 5000,
      infinite : true
    });
  }

}

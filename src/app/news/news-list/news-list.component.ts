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
  news : AdmnistrableItem[] = [];
  podcasts : AdmnistrableItem[] = [];
  isNewsInitialized : boolean = false;
  isPodcastsInitialized : boolean = false;
  
  constructor(private db : DatabaseService) { }

  ngOnInit() 
  {    
    this.db.getNews().take(1).subscribe(news => {this.news = news; console.log("News",news);this.isNewsInitialized = true;this.init(); });
    this.db.getLatestPodcasts(3).take(1).subscribe(podcasts => { this.podcasts = podcasts;this.isPodcastsInitialized = true;console.log("Podcasts",podcasts); this.init(); })
    $(window).on('resize', () =>
    {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => this.initCarousel(), 250);
    });

    $('#slider').hover(
      ()=> {if(this.carousel) this.carousel.stopAutoPlay()},
      ()=> {if(this.carousel) this.carousel.startAutoPlay('next')}
    );    
  }

  private init()
  {
    if (this.isPodcastsInitialized && this.isNewsInitialized)
    {
      this.items = [];
      this.news.forEach(news => this.items.push(news));
      this.podcasts.forEach(podcast => this.items.push(podcast));

      this.items.sort((a:any,b:any) => b.publishOn - a.publishOn); 
      if (this.items.length > 6)
      {
        this.items = this.items.slice(0,6);
      }
      console.log("items",this.items);
      
      if (this.items.length) setTimeout(() => this.initCarousel(),400);
    }
    
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
      autoplayDelay : 3500,
      infinite : true
    });
  }

}

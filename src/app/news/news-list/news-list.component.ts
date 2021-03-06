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
  initCarouselTimer : any;

  items : AdmnistrableItem[] = [];
  news : AdmnistrableItem[] = [];
  podcasts : AdmnistrableItem[] = [];
  isNewsInitialized : boolean = false;
  isPodcastsInitialized : boolean = false;  
  
  constructor(private db : DatabaseService) { }

  ngOnInit() 
  {    
    this.db.getNews().subscribe(news => 
    {
      this.news = news; 
      this.isNewsInitialized = true;
      this.handleNewItems(); 
    });
    this.db.getLatestPodcasts(3).subscribe(podcasts => 
    {
      //console.log("Lastest podcasts", podcasts);
      this.podcasts = podcasts;
      this.isPodcastsInitialized = true; 
      this.handleNewItems(); 
    });

    
    $(window).on('resize', () =>
    {      
      $('.slide').css('width',$('#slider').width());
      if (this.carousel) this.carousel.destroy();
      clearTimeout(this.initCarouselTimer);
      this.initCarouselTimer = setTimeout(() => this.initCarousel(), 500);
    });

    $('#slider').hover(
      ()=> { if(this.carousel) this.carousel.stopAutoPlay();  },
      ()=> { if(this.carousel) this.carousel.startAutoPlay(); }
    );    
  }

  private handleNewItems()
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
      //console.log("items",this.items);
      
      if (this.items.length) 
      {
        clearTimeout(this.initCarouselTimer);
        if (this.carousel) this.carousel.destroy();        
        this.initCarouselTimer = setTimeout(() => this.initCarousel(),600);
      }
    }
    
  }

  private initCarousel()
  {            
    $('.slide').css('width',$('#slider').width());

    this.carousel = new PureJSCarousel({
      carousel: '#slider',
      slide: '.slide',
      oneByOne : true,
      autoplay : true,
      autoplayDelay : 3500,
      autoplayDirection : "next",
      infiniteBasic : true
    });
  }

}

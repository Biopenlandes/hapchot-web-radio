import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }         from '@angular/router';

import { DatabaseService }from '../../shared/database.service';
import { News }        from '../entity/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: News = new News();

  constructor(private route: ActivatedRoute, 
              private db : DatabaseService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => 
    {
       let slug = params['slug']; 
       this.db.getNewsFromSlug(slug).subscribe(news => 
       {
           this.news = news;
           console.log("news", news);
           if (news.content) document.getElementById("content").innerHTML = news.content;
       });
    });
  }

  formatDate(timestamp : number)
  {
    if (!timestamp) return "";
    var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    return "Le " + new Date(timestamp).toLocaleDateString("fr-FR", options);
  }


}

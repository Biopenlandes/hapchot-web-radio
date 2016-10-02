import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsItemComponent } from './news-list/news-item/news-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  NewsComponent,
  NewsListComponent,
  NewsItemComponent]
})
export class NewsModule { }

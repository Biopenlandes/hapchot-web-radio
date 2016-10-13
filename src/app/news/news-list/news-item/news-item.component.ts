import { Component, OnInit , Input} from '@angular/core';
import { AdmnistrableItem } from '../../../shared/administrable-item';


@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  @Input() item : AdmnistrableItem;
  
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

import { DatabaseService }from '../shared/database.service';
import { Presentation }        from './presentation.class';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  presentation: Presentation = new Presentation();

  constructor(private db : DatabaseService) { }

  ngOnInit() {
    this.db.getPresentation().subscribe(presentation => 
    {
       this.presentation = presentation;
       console.log("presentation", presentation);
       if (presentation.content) document.getElementById("content").innerHTML = presentation.content;
    });
  }

}

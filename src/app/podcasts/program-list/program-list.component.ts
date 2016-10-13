import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/database.service';
import { Theme } from '../entity/theme';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent implements OnInit {

  themes : Theme[] = [];

  constructor(private db :DatabaseService) { }

  ngOnInit() {
    this.db.getThemes().subscribe(themes => {console.log("themes",themes);this.themes = themes;});
  }

}

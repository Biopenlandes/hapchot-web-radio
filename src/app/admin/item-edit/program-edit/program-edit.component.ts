import { Component, OnInit, Input } from '@angular/core';
import { Program } from '../../../podcasts/entity/program';

import { Theme } from '../../../podcasts/entity/theme';

import { DatabaseService } from '../../../shared/database.service';

@Component({
  selector: 'app-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.scss']
})
export class ProgramEditComponent implements OnInit {

  @Input() program : Program;
  themes : Theme[];

  constructor(private db : DatabaseService) { }

  ngOnInit() {
    this.db.getThemes().subscribe( themes => this.themes = themes);
  }

}

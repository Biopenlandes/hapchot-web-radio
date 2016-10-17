import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../../shared/database.service';
import { Theme } from '../entity/theme';
import { Program } from '../entity/program';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent implements OnInit {

  themes : Theme[] = [];

  constructor(private db :DatabaseService, private router: Router) { }

  ngOnInit() {
    this.db.getThemes().subscribe(themes => this.themes = themes);
  }

  onSelect(program: Program) {
    this.router.navigate(['/emission', program.slug]);
  }

}

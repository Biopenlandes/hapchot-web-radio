import { Component, OnInit, Input } from '@angular/core';
import { Program } from '../../../podcasts/entity/program';

@Component({
  selector: 'app-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.scss']
})
export class ProgramEditComponent implements OnInit {

  @Input() program : Program;

  constructor() { }

  ngOnInit() {
  }

}

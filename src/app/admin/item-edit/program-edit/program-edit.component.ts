import { Component, OnInit, Input } from '@angular/core';
import { Program } from '../../../podcasts/entity/program';

declare var jscolor: any;

@Component({
  selector: 'app-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.scss']
})
export class ProgramEditComponent implements OnInit {

  @Input() program : Program;
  colorPicker: any;

  constructor() { }

  ngOnInit() {
    if (!this.program.backgroundColor) this.program.backgroundColor = this.getRandomColor();
    this.colorPicker = new jscolor(document.getElementById('inputColor'));
    console.log(this.colorPicker);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  colorChanged(color: string)
  {
    console.log("input", color);
    this.program.backgroundColor = color;
  }

}

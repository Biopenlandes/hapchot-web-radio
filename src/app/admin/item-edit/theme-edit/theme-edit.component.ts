import { Component, OnInit, Input } from '@angular/core';
import { Theme } from '../../../podcasts/entity/theme';


@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.scss']
})
export class ThemeEditComponent implements OnInit {

  @Input() theme : Theme;  

  constructor() { }

  ngOnInit() {

  }

}

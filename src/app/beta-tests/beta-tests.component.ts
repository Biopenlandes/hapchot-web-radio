import { Component, OnInit } from '@angular/core';

import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-beta-tests',
  templateUrl: './beta-tests.component.html',
  styleUrls: ['./beta-tests.component.scss']
})
export class BetaTestsComponent implements OnInit {

  item: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any[]>;  

  constructor(public af: AngularFire) {}

  ngOnInit()
  {
    this.item = this.af.database.object('/item');
    this.items = this.af.database.list('/messages');
    this.af.auth.subscribe(auth => console.log(auth));
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });


  }

  superlogin() {
    this.af.auth.login({
      email: 'test@gmail.fr',
      password: 'testgmail',
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    })
  }

  addItem(newName: string) {
    this.items.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.items.update(key, { text: newText });
  }
  deleteItem(key: string) {    
    this.items.remove(key); 
  }
  deleteEverything() {
    this.items.remove();
  }

  save(newName: string) {
    this.item.set({ name: newName });
  }
  update(newSize: string) {
    this.item.update({ carsize: newSize });
  }
  delete() {
    this.item.remove();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AdmnistrableItem } from '../../shared/administrable-item';
import { DatabaseService } from '../../shared/database.service';
import { AdminItemConfigService, AdminItemConfig } from '../shared/admin-item-config.module';
import { ItemManagerService } from './item-manager.service';

declare var $ : any;

@Component({
  selector: 'app-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.scss']
})
export class ItemManagerComponent implements OnInit {

  items : AdmnistrableItem[] = [];  
  owners : AdmnistrableItem[] = [];

  itemsSubscribtion : Subscription;
  ownersSubscription : Subscription;

  itemConfig : AdminItemConfig;
  ownerConfig : AdminItemConfig;
  ownerSlug : string;

  showList : boolean = true;
  showEdit : boolean = false;

  itemBeingEdited : AdmnistrableItem = new AdmnistrableItem(-1);
  editMode : boolean = false;

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private itemService: ItemManagerService) { }

  ngOnInit() 
  {
    this.route.params.subscribe( (params : Params) => 
    {     
      console.log("Manager route changed");      
      
      this.items = [];
      this.owners = [];
      this.ownerSlug = '';

      let result = this.itemService.initializeFromParams(params); 
      if (!result) { this.router.navigate(['admin']); }
      else
      {
        this.itemConfig = this.itemService.getItemConfig();
        this.ownerConfig = this.itemService.getOwnerConfig();

        this.initItemBeingEdited();
        this.navigateToListcomponent();

        this.showEdit = this.itemConfig.showEditInSameWindow;

        if (this.itemsSubscribtion) this.itemsSubscribtion.unsubscribe();
        this.itemsSubscribtion = this.itemService.getItems().subscribe(items => this.items = items);

        if (this.ownersSubscription) this.ownersSubscription.unsubscribe();
        this.ownersSubscription = this.itemService.getOwners().subscribe(owners => this.owners = owners);       
      }      
    });
  }

  private initItemBeingEdited()
  {
    this.itemBeingEdited = new AdmnistrableItem(this.itemConfig.type);
  }

  onOwnerChanged(event:Object)
  { 
    this.ownerSlug = event.toString();
    this.itemService.onOwnerChanged(event.toString(), this.showEdit, this.itemBeingEdited);    
  }

  onNewItem()
  {    
    this.initItemBeingEdited();
    this.editMode = false;
    this.navigateToEditcomponent();
  }

  onEditItem(item: AdmnistrableItem)
  {
    this.itemBeingEdited = item;
    this.editMode = true;
    this.navigateToEditcomponent();
  } 

  onDeleteItem(item : AdmnistrableItem)
  {
    this.itemService.deleteItem(item);
    this.restoreOwnerSelectValue();
  }

  private restoreOwnerSelectValue()
  {
    // Bug : deleteing Item met le le owner select vide
    // on fait un cagade pour le remettre d'aplomb après 500ms
    let slug = this.ownerSlug;
    this.ownerSlug = 'blop';
    setTimeout(() =>     
    {    
      this.ownerSlug = slug;
    }, 500);
  }

  onItemEditDone()
  {
    this.editMode = false;
    this.initItemBeingEdited();
    this.navigateToListcomponent();
    this.restoreOwnerSelectValue();
  }

  private navigateToEditcomponent()
  {
    if (this.itemConfig.showEditInSameWindow)
    {
      this.showEdit = true;
      $("html, body").stop().animate({scrollTop: $('app-item-edit').offset().top }, '500', 'swing');
    }
    else
    {
      this.showList = false;
      this.showEdit = true;
    }    
  }

  private navigateToListcomponent()
  {
    if (this.itemConfig.showEditInSameWindow)
    {
      $("html, body").stop().animate({scrollTop:0}, '500', 'swing');
    }
    else
    {
      this.showList = true;
      this.showEdit = false;
    }    
  }
}

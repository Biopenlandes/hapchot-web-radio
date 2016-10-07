import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from '../../shared/database.service';

import { AdmnistrableItem } from '../../shared/administrable-item';
import { AdminItemConfigService, AdminItemConfig, AIType } from '../shared/admin-item-config.module';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  item : AdmnistrableItem = new AdmnistrableItem();
  editMode : boolean = true;
  itemConfig : AdminItemConfig;
  AIType;

  constructor(private db : DatabaseService, 
              private route: ActivatedRoute,
              private router: Router,
              private itemConfService: AdminItemConfigService) {

  }

  ngOnInit() 
  { 
    this.route.params.subscribe( params => 
    {
      // getting conf    
      this.itemConfig = this.itemConfService.checkConfFromParams(params);
      
      // check if /edit/:slug or /new route
      if (!this.route.snapshot.params['slug'])
      {
         this.editMode = false;
      } 
      // if edit/:slug get the item
      else
      { 
        this.db.getItemBySlug(this.route.snapshot.params['slug']).take(1).subscribe(item => 
        {
          if (item.slug) this.item = item;
          else this.redirectToNewComponent();   
        });
      }  
    });

    this.AIType = AIType;

    

    // Resolve example
    /*this.route.data.forEach((data: { item: AdmnistrableItem }) => {
      console.log("ItemEdit fetch item", data);
      this.item = data.item;
      if (!this.item.slug)
      {
        console.log("item vide", this.item);
        this.editMode = false;
      }
    });*/   
  }

  addItem()
  {    
    // TODO check form complete
    if (!this.item.title) { console.log("item non rempli", this.item); return;}    
    
    // TODO laisser le vrai fichier uploadé dfini par vaadin dans nginit
    // this.item.pictureUrl = "assets/uploads/image.jpg";

    let result = this.db.addItem(this.item);

    if(!result) alert("ce titre est déjà pris pour une sortie !");
    else { this.redirectToListComponent(); }   
  } 

  updateItem()
  {
    //let oldItem = this.item;
    delete this.item['$key']; 
    delete this.item['$exists']; 
    console.log("updateItem",this.item);
    this.db.deleteItemFromSlug(this.item.slug);
    this.addItem();
  }

  redirectToListComponent()
  {
    if (this.editMode) this.router.navigate(['../..'], { relativeTo : this.route});
    else this.router.navigate(['..'], { relativeTo : this.route});    
  }

  redirectToNewComponent()
  {
    this.router.navigate(['../../new'], { relativeTo : this.route});
  }

}

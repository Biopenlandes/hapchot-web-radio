import { Component, OnInit, Input } from '@angular/core';
import { ImageContentAdmnistrableItem } from '../../../shared/image-content-administrable-item';
import { AIType } from '../../shared/admin-item-config.types';
import { AdminItemConfig } from '../../shared/admin-item-config.class';
import { Picture } from '../../../shared/picture.class';

declare var $ : any;

@Component({
  selector: 'app-image-content-item-edit',
  templateUrl: './image-content-item-edit.component.html',
  styleUrls: ['./image-content-item-edit.component.scss']
})
export class ImageContentItemEditComponent implements OnInit {

  @Input() imageContentItem : ImageContentAdmnistrableItem; 
  @Input() itemConfig : AdminItemConfig;
  AIType;
  config : any = {};

  constructor() { }

  ngOnInit() {
    this.AIType = AIType;

    if (!this.imageContentItem.publishOn) this.imageContentItem.publishOn = Date.now();

    /*$('#uploadForm').ajaxForm(function() { 
        alert("Thank you for your comment!"); 
    });*/

/*    $('#uploadForm').on('submit', uploadFiles);

    // Variable to store your files
var files;

// Add events
$('input[type=file]').on('change', prepareUpload);

// Grab the files and set them to our variable
function prepareUpload(event)
{
  files = event.target.files;
  console.log("prepareUpload",files);
}

// Catch the form submit and upload the files
function uploadFiles(event)
{
  console.log("form submit");
  event.stopPropagation(); // Stop stuff happening
    event.preventDefault(); // Totally stop stuff happening

    // START A LOADING SPINNER HERE

    // Create a formdata object and add the files
    var data = new FormData();
    $.each(files, function(key, value)
    {
        data.append(key, value);
    });

    console.log("data",data);

    $.ajax({
        url: 'https://jeanot.fr/hapchot-server/upload.php?file',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR)
        {
            if(typeof data.error === 'undefined')
            {
                // Success so call function to process the form
                //submitForm(event, data);
                console.log("success");
            }
            else
            {
                // Handle errors here
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
            // STOP LOADING SPINNER
        }
    });
}*/

    /*$("#theForm").ajaxForm({url: 'server.php', type: 'post'})*/
/*    
    var vaadinDatePicker : any;
    vaadinDatePicker = document.querySelector('vaadin-upload');
    vaadinDatePicker.addEventListener('value-changed', 
      (event:any) =>  {console.log('Selected: ' + vaadinDatePicker.value);this.imageContentItem.publishOn = vaadinDatePicker.value;
    });

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });*/

    /*this.config.height = 600;    
    this.config.autoGrow_onStartup = true;*/
    this.config.startupOutlineBlocks = true;

    console.log("ckeditor config", this.config);

    /*var vaadinUpload = document.querySelector('vaadin-upload');
    vaadinUpload.addEventListener('upload-success', 
      (event:any) => {console.log("upload success",event.detail.file.name);this.imageContentItem.pictures = new Picture(event.detail.file.name);});*/
  }  


  onDateChange(value: any)
  {
    this.imageContentItem.publishOn = new Date(value).getTime();
  }

  getDate()
  {
    var options = {weekday: "long", month: "long", day: "numeric", year:"numeric"};
    return new Date(this.imageContentItem.publishOn).toLocaleDateString("fr-FR", options);
  }

}

import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router'
import { DatabaseService } from '../shared/database.service';
import { Program } from '../podcasts/entity/program';
//import { AuthService }      from '../admin/login/auth.service';

declare var scheduler: any;
declare var Firebase: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  adminMode : boolean = false;
  programs : Program[] = [];
  initSchedulerTimer : any;
  readyToInit : boolean = false;

  constructor(private db : DatabaseService, private router : Router) { }

  ngOnInit() 
  {    
    /*this.authService.isLoggedIn.take(1).subscribe(isLogged =>
    {
      this.adminMode = isLogged;
      this.db.getPrograms().subscribe(programs =>
      {
        this.programs = programs;
        this.readyToInit = true;
        clearTimeout(this.initSchedulerTimer);
        this.initSchedulerTimer = setTimeout( () => this.initScheduler(), 500);
      });        
    });*/  

    this.db.getPrograms().subscribe(programs =>
    {
      this.programs = programs;
      this.readyToInit = true;
      clearTimeout(this.initSchedulerTimer);
      this.initSchedulerTimer = setTimeout( () => this.initScheduler(), 500);
    });   
  }

  navigateToAdmin()
  {
    this.router.navigate(['/admin']);
  }

  private initSchedulerForAdmin()
  {
    scheduler.locale.labels.section_select = 'Emission';
    
    let program_opts = [];
    this.programs.forEach(program => 
    {
      let option = {
        key : program.slug,
        label : program.title
      }
      program_opts.push(option);

    });    

    scheduler.locale.labels.section_rediff = "Rediffusion"; 
    var rediff_opts = [
        { key: ' ', label: 'Original' },
        { key: '(Rediff)', label: 'Rediff '}
    ];  

    scheduler.config.lightbox.sections = 
    [
        { name:"select", height:40, map_to:"slug", type:"select", options:program_opts},
        { name:"rediff", height:40, map_to:"rediff", type:"select", options:rediff_opts},
        { name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
              button:"recurring"},
        { name:"time", height:72, type:"time", map_to:"auto"}
    ];  
  }

  private initScheduler()
  {
    scheduler.config.readonly = !this.adminMode; 
    if (this.adminMode) this.initSchedulerForAdmin();  

    scheduler.config.time_step = 15;
    scheduler.config.first_hour = 8;
    //scheduler.config.last_hour = 21;
    scheduler.config.edit_on_create = true;
    scheduler.config.details_on_create = true;
    scheduler.config.details_on_dblclick = true;

    scheduler.config.xml_date="%Y-%m-%d %H:%i";
    scheduler.config.hour_date="%G:%i";
    
    //scheduler.config.hour_size_px = 80;   

    scheduler.attachEvent("onEventAdded", (id,ev) => 
    {
       let program = this.programs.find( value => value.slug == ev.slug );
       if (program && program.backgroundColor)
       {
         ev.color = '#' + program.backgroundColor;
         ev.textColor = this.getTextColorFromBackdColor(ev.color);
       }
    }); 
    
    scheduler.attachEvent("onTemplatesReady", () => {
      scheduler.templates.event_bar_date = (start,end,ev) =>{
        return '<b>'+scheduler.templates.event_date(start)+"</b> ";
      };

      scheduler.templates.event_text= (start,end,event)=> {
        let program = this.programs.find( value => value.slug == event.slug );
        if (!program) return "programme supprimé";
        return program.title + " <br/><i>"+event.rediff +"</i>";
      };

      scheduler.templates.event_bar_text = (start,end,event) => {
        let program = this.programs.find( value => value.slug == event.slug );
        if (!program) return "programme supprimé";
        if (event.rediff != ' ')
        {
          return program.title + " <i>" + event.rediff + "</i>";
        }
        return program.title;      
      };
    });     

    scheduler.init('scheduler_here', new Date(),"week");
    var data = new Firebase("https://hapchot-web-radio-43cd6.firebaseio.com"),
    events = data.child("events");
    scheduler.firebase(events);
  }

   getTextColorFromBackdColor(bgColor)
   {
    if (!bgColor) { return ''; }
    return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
    }

}

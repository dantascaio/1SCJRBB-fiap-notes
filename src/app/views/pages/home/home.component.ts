import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Note } from 'src/app/services/@types/note';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id?: number;
  private sub: any;
  eventsSubject: Subject<Note> = new Subject<Note>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.sub = this.route.params.subscribe(
    //   params => {
    //     this.id = params['id']
    //     alert(this.id);
    //   }    
    // )
  }

  editNote(note : Note){
    this.eventsSubject.next(note);
  }

}

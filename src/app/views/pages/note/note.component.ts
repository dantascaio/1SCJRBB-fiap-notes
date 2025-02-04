import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/services/@types/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  // note = {
  //   id: 1,
  //   date: new Date(),
  //   text: "Um texto qualquer",
  //   urgert: false
  // }

  @Input()
  noteProp = {} as Note;

  @Input()
  titleProp: any;

  @Output()
  notify = new EventEmitter();

  @Output()
  notifyEditionToList = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  editNote(){
      this.notifyEditionToList.emit(this.noteProp);
  }

  confirmRemove(){
    if(confirm("Deseja realmente apagar?"))
      this.notify.emit();
  }

}

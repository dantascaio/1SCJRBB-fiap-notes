import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Note } from 'src/app/services/@types/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css'],
})
export class FormNoteComponent implements OnInit {
  title = 'FIAP NOTES';
  logoImage = '/assets/logo.png';

  checkoutForm: FormGroup;

  private eventsSubscription: Subscription = new Subscription;

  private isEditing = false;

  private editedNote = { } as Note;

  @Input()
  events!: Observable<Note>;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService
  ) {
    this.checkoutForm = this.formBuilder.group({
      textNote: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((note) => 
    {
      this.editedNote = note;
      this.isEditing = true;
      this.checkoutForm.controls['textNote'].setValue(note.text);
    });
  }

  ngOnDestroy() {
  this.eventsSubscription.unsubscribe();
}

  sendNote() {
    // console.log(this.checkoutForm.get('textNote')?.errors);
    if (this.checkoutForm.valid) {
      if(this.isEditing){
        this.editedNote.text = this.checkoutForm.value.textNote;
        this.noteService.editNote(this.editedNote).subscribe(
          {
            next: () => {
              this.checkoutForm.reset();
              this.isEditing = false;
            }
          }
        );
      }
      else{
        this.noteService.postNotes(this.checkoutForm.value.textNote).subscribe({
          //next é chamado quando as coisas dão certo
          next: (note) => {
            this.checkoutForm.reset();
            this.noteService.notifyNewNoteAdded(note);
          },
          //error é chamado no caso de excessões
          error: (error) => alert("Algo errado na inserção! " + error)
        });
      }
      
    }
  }

  get editable(){
    return this.isEditing;
  }

  cancelEdit() {
    this.checkoutForm.reset();
    this.isEditing = false;
  }

  get textNote() {
    return this.checkoutForm.get('textNote') ;
  }
}

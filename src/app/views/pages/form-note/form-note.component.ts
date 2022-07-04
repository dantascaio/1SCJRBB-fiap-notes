import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css']
})
export class FormNoteComponent implements OnInit {

  title = "FIAP NOTES";
  logoImage = "/assets/logo.png";

  checkoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
      private noteService: NoteService) {
    this.checkoutForm = this.formBuilder.group({
      textNote: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  ngOnInit(): void {
  }

  sendNote(){
    // console.log(this.checkoutForm.get('textNote')?.errors);
    if(this.checkoutForm.valid){  
      this.noteService.postNotes(this.checkoutForm.value.textNote)
        .subscribe(
          (note) => {
            this.checkoutForm.reset();
            this.noteService.notifyNewNoteAdded(note);
          }
        );
    }
  }

  get textNote(){
    return this.checkoutForm.get('textNote');
  }

}

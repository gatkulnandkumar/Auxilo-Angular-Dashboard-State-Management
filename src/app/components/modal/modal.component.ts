import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Data {
  name: string;
  id: number;
}

@Component({
  selector: 'app-model',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  
})
export class ModalComponent implements OnInit {

  public action:string;
  public local_data:any;

  // @ViewChild('cancelButton') cancelButton: ElementRef | undefined;


  constructor(public dialogRef: MatDialogRef<ModalComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: Data) {
      console.log(data);
      console.log(data);
      this.local_data = {...data};
      this.action = this.local_data.action;
     }


  ngOnInit(): void {
  }

  openModel(){ // method for modal open
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeModal() { // method for modal close
    // this.dialogRef.close();
    this.dialogRef.close({event:'cancel'});
  }

  deleteModel(){ // Delete popup
    this.dialogRef.close({event:'delete'});
  }

 
  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){ // method for modal close
    this.dialogRef.close({event:'Cancel'});
  }

 
// handleKeyDown(event: KeyboardEvent) {
//   if (event.key === 'Enter') {
//     event.preventDefault(); // Prevent the default Enter key behavior
//     this.closeDialog();
//     this.setFocusOnCancelButton();
//   }
// }

// setFocusOnCancelButton() {
//   if (this.cancelButton && this.cancelButton.nativeElement) {
//     this.cancelButton.nativeElement.focus();
//   }
// }
}
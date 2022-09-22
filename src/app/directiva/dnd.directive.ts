import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  constructor() { }


  @HostListener('dragover',['$event']) onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;

    console.log('Drag Over');
    
  }
  
  @HostListener('dragleave',['$event'])public onDragleave(evt){
    evt.preventDefault();
    evt.stopPropagation();

    console.log('Drag leave');
    
  }

  @HostListener('drop',['$event'])public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    //this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0){
      this.fileDropped.emit(files);      
    }
  }

  



}

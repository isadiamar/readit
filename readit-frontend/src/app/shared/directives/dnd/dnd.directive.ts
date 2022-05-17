import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @HostBinding('class.fileover') fileOver:boolean;

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt:any){
    evt.preventDefault();
    evt.stopPropagation();

    console.log('Drag Over')
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt:any){
    evt.preventDefault();
    evt.stopPropagation();

    console.log('Drag Leave')
  }

  @HostListener('drop', ['$event']) public ondrop(evt:any){
    evt.preventDefault();
    evt.stopPropagation();

    console.log('Drop')
  }
}

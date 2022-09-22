import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.scss']
})
export class ProgresoComponent implements OnInit {
  @Input() progress = 0;
  constructor() { }

  ngOnInit(): void {
  }

}

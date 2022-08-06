import { Component, OnInit  } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ang_Portfolio';
  faChevron = faChevronDown;
}



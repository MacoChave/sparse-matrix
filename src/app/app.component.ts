import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowDiagramComponent } from './flow-diagram/flow-diagram.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FlowDiagramComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sparse-matrix';
}

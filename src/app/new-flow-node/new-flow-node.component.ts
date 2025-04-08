import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlowNodeType } from '../interfaces/iFlowNode';

@Component({
  selector: 'app-new-flow-node',
  imports: [CommonModule],
  templateUrl: './new-flow-node.component.html',
  styleUrl: './new-flow-node.component.css',
  standalone: true,
})
export class NewFlowNodeComponent {
  FlowNodeType = FlowNodeType; // Para usar en la plantilla

  @Input() visible: boolean = false;
  @Output() selectedNodeType = new EventEmitter<FlowNodeType>();
  @Output() close = new EventEmitter<void>();

  select(type: FlowNodeType) {
    this.selectedNodeType.emit(type);
  }

  emitClose() {
    this.close.emit();
  }
}

import { Component } from '@angular/core';
import { iFlowLink, iFlowNode } from '../interfaces/iFlowNode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flow-diagram',
  imports: [CommonModule],
  templateUrl: './flow-diagram.component.html',
  styleUrl: './flow-diagram.component.css',
})
export class FlowDiagramComponent {
  nodes: iFlowNode[] = [];
  links: iFlowLink[] = [];

  nodeWith = 120;
  nodeHeight = 50;
  nodeCounter = 0;

  constructor() {
    const startNode: iFlowNode = {
      id: 'node-0',
      label: 'Start',
      type: 'start',
      position: {
        x: 10,
        y: 100,
      },
      data: {},
      hasRight: false,
      hasBottom: false,
    };
    this.nodes.push(startNode);
  }

  // Add right node to current node
  addRightNode(node: iFlowNode) {
    const newNode: iFlowNode = {
      id: `node-${this.nodeCounter++}`,
      label: `Node ${this.nodeCounter}`,
      type: 'input',
      position: {
        x: node.position.x + this.nodeWith + 50,
        y: node.position.y,
      },
      data: {},
    };

    node.hasRight = true;

    this.nodes.push(newNode);
    this.links.push({
      from: node.id,
      to: newNode.id,
    });
  }

  // Add bottom node to current node
  addBelowNode(node: iFlowNode) {
    const newNode: iFlowNode = {
      id: `node-${this.nodeCounter++}`,
      label: `Node ${this.nodeCounter}`,
      type: 'input',
      position: {
        x: node.position.x,
        y: node.position.y + this.nodeHeight + 100,
      },
      data: {},
    };

    node.hasBottom = true;

    this.nodes.push(newNode);
    this.links.push({
      from: node.id,
      to: newNode.id,
    });
  }

  getNodePosition(id: string): { x: number; y: number } {
    return (
      this.nodes.find((node) => node.id === id)?.position || { x: 0, y: 0 }
    );
  }
}

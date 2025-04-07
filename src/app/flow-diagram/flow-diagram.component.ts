import { Component } from '@angular/core';
import { iFlowLink, iFlowNode } from '../interfaces/iFlowNode';
import { CommonModule } from '@angular/common';
import { __runInitializers } from 'tslib';

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
      id: `flownode-${this.nodeCounter++}`,
      label: 'Start',
      type: 'start',
      position: {
        x: 0,
        y: 0,
      },
      data: {},
      hasRight: false,
      hasBottom: false,
    };
    this.nodes.push(startNode);
    this.addAddNode(startNode);
  }
  
  onInit() {
  }
  
  addAddNode(node: iFlowNode) {
    const addNode: iFlowNode = {
      id: `flownode-${this.nodeCounter++}`,
      label: 'Add',
      type: 'add',
      position: {
        x: node.position.x + 200,
        y: node.position.y
      }
    }
    this.addRightNode(node, addNode)
  }

  addConditionNode(node: iFlowNode) {
    node.type = 'condition'

    const condNode: iFlowNode = {
      id: `flownode-${this.nodeCounter++}`,
      label: 'If',
      type: 'if',
      position: {
        x: node.position.x + 200,
        y: node.position.y
      }
    }
    this.addRightNode(node, condNode)

    const thenNode: iFlowNode = {
      id: '',
      label: '',
      type: 'then',
      position: {
        x: condNode.position.x + 200,
        y: condNode.position.y
      }
    }

    const elseNode: iFlowNode = {
      id: '',
      label: '',
      type: 'else',
      position: {
        x: condNode.position.x,
        y: condNode.position.y + 200
      }
    }

    this.addRightNode(condNode, thenNode)
    this.addBelowNode(condNode, elseNode)

    this.addAddNode(thenNode);
  }

  // Add right node to current node
  addRightNode(node: iFlowNode, rightNode: iFlowNode) {
    node.hasRight = true;

    this.nodes.push(rightNode);
    // this.links.push({
    //   from: node.id,
    //   to: rightNode.id,
    // });
  }

  // Add bottom node to current node
  addBelowNode(node: iFlowNode, bellowNode: iFlowNode) {
    node.hasBottom = true;

    this.nodes.push(bellowNode);
    // this.links.push({
    //   from: node.id,
    //   to: newNode.id,
    // });
  }

  getNodePosition(id: string): { x: number; y: number } {
    return (
      this.nodes.find((node) => node.id === id)?.position || { x: 0, y: 0 }
    );
  }
}

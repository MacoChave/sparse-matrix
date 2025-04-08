import { Component } from '@angular/core';
import { FlowNodeType, iFlowLink, iFlowNode } from '../interfaces/iFlowNode';
import { CommonModule } from '@angular/common';
import { __runInitializers } from 'tslib';
import { NewFlowNodeComponent } from '../new-flow-node/new-flow-node.component';

@Component({
  selector: 'app-flow-diagram',
  imports: [CommonModule, NewFlowNodeComponent],
  templateUrl: './flow-diagram.component.html',
  styleUrl: './flow-diagram.component.css',
})
export class FlowDiagramComponent {
  FlowNodeType = FlowNodeType; // Para usar en la plantilla

  nodes: iFlowNode[] = [];
  links: iFlowLink[] = [];

  nodeWith = 120;
  nodeHeight = 50;
  nodeCounter = 0;
  isModalOpen: boolean = false;
  selectedParent: iFlowNode | null = null;
  selectedDirection: 'right' | 'below' | null = null;

  constructor() {
    const startNode: iFlowNode = {
      id: `flownode-${this.nodeCounter++}`,
      label: 'Start',
      type: FlowNodeType.START,
      position: {
        x: 0,
        y: 0,
      },
      data: {},
    };
    this.nodes.push(startNode);
    this.addAddNode(startNode);
  }

  addAddNode(node: iFlowNode) {
    const addNode: iFlowNode = {
      id: `flownode-${this.nodeCounter++}`,
      label: 'Add',
      type: FlowNodeType.ADD,
      position: {
        x: node.position.x + 200,
        y: node.position.y,
      },
    };
    this.addRightNode(node, addNode);
  }

  addConditionNode(node: iFlowNode) {
    node.type = FlowNodeType.IF;

    const condNode: iFlowNode = {
      id: `flownode-${this.nodeCounter++}`,
      label: 'If',
      type: FlowNodeType.CONDITION,
      position: {
        x: node.position.x + 200,
        y: node.position.y,
      },
    };

    const thenNode: iFlowNode = {
      id: '',
      label: '',
      type: FlowNodeType.THEN,
      position: {
        x: condNode.position.x + 200,
        y: condNode.position.y,
      },
    };

    const elseNode: iFlowNode = {
      id: '',
      label: '',
      type: FlowNodeType.ELSE,
      position: {
        x: condNode.position.x,
        y: condNode.position.y + 200,
      },
    };

    this.addRightNode(node, condNode);
    this.addRightNode(condNode, thenNode);
    this.addBelowNode(condNode, elseNode);
    this.addAddNode(thenNode);
    this.addAddNode(elseNode);
  }

  addProcessNode(selectedParent: iFlowNode) {
    selectedParent.type = FlowNodeType.PROCESS;
    this.addAddNode(selectedParent);
  }

  addEndNode(selectedParent: iFlowNode) {
    selectedParent.type = FlowNodeType.END;
  }

  // Add right node to current node
  addRightNode(node: iFlowNode, rightNode: iFlowNode) {
    this.nodes.push(rightNode);
    rightNode.parent = node;
    node.rightNode = rightNode;
  }

  // Add bottom node to current node
  addBelowNode(node: iFlowNode, bellowNode: iFlowNode) {
    this.nodes.push(bellowNode);
    bellowNode.parent = node;
    node.belowNode = bellowNode;
  }

  getNodePosition(id: string): { x: number; y: number } {
    return (
      this.nodes.find((node) => node.id === id)?.position || { x: 0, y: 0 }
    );
  }

  openModal(parent: iFlowNode, direction: 'right' | 'below') {
    this.isModalOpen = true;
    this.selectedParent = parent;
    this.selectedDirection = direction;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedParent = null;
    this.selectedDirection = null;
  }

  onNodeTypeSelected(type: FlowNodeType) {
    if (!this.selectedParent || !this.selectedDirection) return;

    // Create a new node based on the selected type
    switch (type) {
      case FlowNodeType.CONDITION:
        this.addConditionNode(this.selectedParent);
        break;
      case FlowNodeType.PROCESS:
        this.addProcessNode(this.selectedParent);
        break;
      case FlowNodeType.END:
        this.addEndNode(this.selectedParent);
        break;
    }

    this.closeModal();
  }

  cleanNodes() {
    this.nodes = [];
    this.links = [];
    this.nodeCounter = 0;

    const startNode: iFlowNode = {
      id: `flownode-${this.nodeCounter++}`,
      label: 'Start',
      type: FlowNodeType.START,
      position: {
        x: 0,
        y: 0,
      },
      data: {},
    };
    this.nodes.push(startNode);
    this.addAddNode(startNode);
  }
}

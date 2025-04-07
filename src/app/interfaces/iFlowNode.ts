export interface iFlowNode {
  id: string;
  label: string;
  type: 'start' | 'end' | 'action' | 'condition' | 'input' | 'output'; // Tipo de nodo
  position: {
    x: number;
    y: number;
  };
  hasRight?: boolean; // Para nodos hijos
  hasBottom?: boolean; // Para nodos hijos
  hasParent?: boolean; // Para nodos hijos

  data?: any; // Para almacenar datos adicionales
  bottom?: iFlowNode; // Para nodos hijos
  right?: iFlowNode; // Para nodos hijos
  parent?: iFlowNode; // Para nodos hijos
  branches?: { true: string; false: string }; // Para condiciones
}

export interface iFlowLink {
  from: string; // ID del nodo origen
  to: string; // ID del nodo destino
}

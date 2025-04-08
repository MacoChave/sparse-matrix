export enum FlowNodeType {
  START = 'start',
  END = 'end',
  ADD = 'add',
  IF = 'if',
  THEN = 'then',
  ELSE = 'else',
  CONDITION = 'condition',
  PROCESS = 'process',
  IMPRIME = 'imprime',
  NOTIFICA = 'notifica',
  // Otros tipos de nodos
  // ...
}

export interface iFlowNode {
  id: string;
  label: string;
  type: FlowNodeType; // Tipo de nodo (start, end, add, etc.)
  position: {
    x: number;
    y: number;
  };
  data?: any; // Para almacenar datos adicionales
  parent?: iFlowNode; // Para nodos hijos
  rightNode?: iFlowNode; // Para nodos hijos a la derecha
  belowNode?: iFlowNode; // Para nodos hijos abajo
}

export interface iFlowLink {
  from: string; // ID del nodo origen
  to: string; // ID del nodo destino
}

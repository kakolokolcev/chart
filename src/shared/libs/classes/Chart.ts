import { useConnectionCoords } from '@/shared/ui/connection';

import { Node } from './Node';
import { Connection } from './Connection';

const defaultMainNodeTitle = 'Нажмите, чтобы изменить заголовок';

export class Chart {
  mainNode: Node;

  nodes: Node[];

  connections: Connection[];

  constructor(x: number, y: number) {
    this.mainNode = new Node(x, y, defaultMainNodeTitle);

    this.nodes = [];
    this.connections = [];
  }

  createNode(start: { x: number; y: number }, end: { x: number; y: number }) {
    const connectionPoints = useConnectionCoords().createConnectionCoords(start, end);
    console.log(connectionPoints);
    this.connections.push(new Connection(connectionPoints));
  }
}

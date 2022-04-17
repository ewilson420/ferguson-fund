import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InputTopicNode } from './interfaces/input-topic-node';

declare var vis: any;

interface VisClickEvent {
  nodes: string[];
  edges: string[];
  event: any;
  points: any;
}


const defaultOptions = {
  layout: {
    //  clusterThreshold: 200
  },
  physics: {
    // Even though it's disabled the options still apply to network.stabilize().
    solver: "repulsion",
    repulsion: {
      nodeDistance: 200 // Put more distance between the nodes.
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class NetworkVisService {
  private nodes: any;
  private edges: any;
  private vis: any;

  public events: { selectNode: Subject<string> } = {
    selectNode: new Subject()
  }

  constructor() { }

  public init(el: ElementRef, data: { nodes: InputTopicNode[], edges: [] }, options = {}) {
    this.nodes = new vis.DataSet(data.nodes, { delay: 10 });
    this.edges = new vis.DataSet(data.edges, { delay: 10 });

    const visNodes = this.convertToVisNodes(this.nodes);
    console.log(visNodes)
    this.vis = new vis.Network(el.nativeElement, { nodes: visNodes, edges: this.edges }, defaultOptions);

    this.vis.on('selectNode', (data: VisClickEvent) => {
      this.events.selectNode.next(data.nodes[0] ?? null);
    });
  }

  public replaceAllEdges(edges: Array<[string, string]>) {
    this.edges.clear();
    this.edges.add(edges.map(edge => { return { from: edge[0], to: edge[1] } }));
  }

  public selectNode(nodeId: string) {
    this.vis.selectNodes([nodeId], true);
  }

  private convertToVisNodes(nodes: InputTopicNode[]) {
    return nodes.map(x => {
      const node = {
        id: x.id,
        label: x.title ?? 'Missing title',
        title: x.title,
        font: {
          size: 24
        },
        shapeProperties: {
          borderRadius: 20
        },
        shape: 'box',
        margin: 20,
        shadow: true,
        color: { background: '#fff' },

      };
      return node;
    })
  }

}

import { Injectable } from '@angular/core';
import { InputTopicNode } from './interfaces/input-topic-node';
import nodeData from '../../../data.json';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkDataService {
  private nodes: InputTopicNode[];
  private routedNodeSource = new BehaviorSubject(null);
  public routedNode$ = this.routedNodeSource.asObservable();

  constructor(private router: Router) {
    this.nodes = nodeData.nodes as any;

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      this.routedNodeSource.next(this.getRoutedNodeId());
    });
  }

  getRoutedNodeId(): string {
    return this.router.routerState.snapshot.root.firstChild.firstChild?.params['nodeId'] ?? null;
  }

  getAllNodes(): InputTopicNode[] {
    return this.nodes;
  }

  getNode(nodeId: string): InputTopicNode {
    return this.nodes.find(x => x.id === nodeId);
  }

  getEdgesOfNode(nodeId: string): Array<[string, string]> {
    const node = this.nodes.find(x => x.id === nodeId);
    const edges = [];
    const seen = {};

    function markSeen(edge: [string, string]) {
      seen[edge.sort().join('.')] = true;
    }

    function isSeen(edge: [string, string]): boolean {
      return edge.sort().join('.') in seen;
    }

    function collectEdge(edge: [string, string]) {
      if (!isSeen(edge)) {
        edges.push(edge);
        markSeen(edge);
      }
    }

    for (const neighborId of node.connected_to) {
      collectEdge([node.id, neighborId]);
    }

    for (const otherNode of this.nodes) {
      if (otherNode.id === nodeId) {
        continue;
      }

      if (otherNode.connected_to.includes(nodeId)) {
        collectEdge([nodeId, otherNode.id]);
      }
    }

    return edges;
  }

}

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
  private _edges: { [key: string]: string[] } = {};
  private _nodes: { [key: string]: InputTopicNode } = {};

  constructor(private router: Router) {
    this.nodes = nodeData.nodes as any;
    this.analyzeEdges();

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      this.routedNodeSource.next(this.getRoutedNodeId());
    });
  }

  private analyzeEdges() {
    for (const node of this.nodes) {
      this._nodes[node.id] = node;

      for (const connectedId of node.connected_to) {
        if (!this._edges[connectedId]) {
          this._edges[connectedId] = [];
        }

        if (!this._edges[node.id]) {
          this._edges[node.id] = [];
        }

        if (!this._edges[connectedId].includes(node.id)) {
          this._edges[connectedId].push(node.id);
        }

        if (!this._edges[node.id].includes(connectedId)) {
          this._edges[node.id].push(connectedId);
        }
      }
    }
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

  getNeighborsOfNode(nodeId: string): InputTopicNode[] {
    const neighbors = [];
    const connected = this._edges[nodeId] ?? [];

    for (const id of connected) {
      if (this._nodes[id]) {
        neighbors.push(this._nodes[id]);
      }
    }

    return neighbors;
  }

  getEdgesOfNode(nodeId: string): Array<[string, string]> {
    const edges = [];

    for (const id of this._edges[nodeId]) {
      edges.push([nodeId, id]);
    }

    return edges;
  }

}

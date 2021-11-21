import { ElementRef, Injectable } from '@angular/core';

declare var vis: any;


@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private nodes: any;
  private edges: any;
  private visNetwork: any;

  constructor() { }

  public init(el: ElementRef, data: { nodes: any[], edges: [] }, options = {}) {
    this.nodes = new vis.DataSet(data.nodes, { delay: 10 });
    this.edges = new vis.DataSet(data.edges, { delay: 10 });
    this.visNetwork = new vis.Network(el.nativeElement, { nodes: this.nodes, edges: this.edges }, options);
  }

  replaceAllEdges(edges: any[]) {
    this.edges.clear();
    this.edges.add(edges);
  }

}

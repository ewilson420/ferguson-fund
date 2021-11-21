import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NetworkService } from '../network.service';
import nodeData from '../../../../data.json';
import { InputTopicNode } from '../interfaces/input-topic-node';




@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styles: [`
    .wrapper {
      background-color: #222;
    }
  `]
})
export class NetworkComponent implements AfterViewInit {
  @ViewChild('network') networkEl: ElementRef;
  private inputNodes: InputTopicNode[] = nodeData.nodes;

  constructor(private network: NetworkService) { }

  ngAfterViewInit(): void {
    console.log(this.inputNodes)
    this.network.init(this.networkEl, {
      nodes: this.inputNodes.map(x => { return { id: x.id, label: x.title, margin: 10, shape: 'circle', color: { background: '#fff' }, shadow: true } }),
      edges: []
    });

    setTimeout(() => {
      this.network.replaceAllEdges([
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ])
    }, 1000);
  }

}

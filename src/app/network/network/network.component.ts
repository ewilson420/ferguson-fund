import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styles: [
  ]
})
export class NetworkComponent implements AfterViewInit {
  @ViewChild('network') networkEl: ElementRef;

  constructor(private network: NetworkService) { }

  ngAfterViewInit(): void {
    this.network.init(this.networkEl, {
      nodes: [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' }
      ],
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

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkDataService } from '../network-data.service';
import { NetworkVisService } from '../network-vis.service';



@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styles: [`
    .wrapper {
      background-color: #222;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkComponent implements AfterViewInit {
  @ViewChild('network') networkEl: ElementRef;
  public columnOneSize = 12;
  public columnTwoSize = 0;

  constructor(private networkVis: NetworkVisService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private networkData: NetworkDataService) { }

  ngAfterViewInit(): void {
    this.networkVis.init(this.networkEl, {
      nodes: this.networkData.getAllNodes(),
      edges: []
    });

    this.networkVis.events.selectNode.subscribe(nodeId => {
      this.router.navigate(['/', nodeId]);
    });

    this.networkData.routedNode$.subscribe(nodeId => {
      this.onRouteToNode(nodeId)
    });
  }

  onRouteToNode(nodeId: string | null) {
    if (nodeId) {
      this.networkVis.replaceAllEdges(this.networkData.getEdgesOfNode(nodeId));
      this.networkVis.selectNode(nodeId);
      this.columnOneSize = 8;
      this.columnTwoSize = 4;
    } else {
      this.networkVis.replaceAllEdges([]);
      this.columnOneSize = 12;
      this.columnTwoSize = 0;
    }

    this.cd.detectChanges();
  }

}

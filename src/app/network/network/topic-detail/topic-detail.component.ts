import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputTopicNode } from '../../interfaces/input-topic-node';
import { NetworkDataService } from '../../network-data.service';
import { NetworkVisService } from '../../network-vis.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styles: [
  ]
})
export class TopicDetailComponent implements OnInit {
  public topic: InputTopicNode;

  constructor(private route: ActivatedRoute, private networkData: NetworkDataService, private networkVis: NetworkVisService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.topic = this.networkData.getNode(params['nodeId']);
    });
  }

}

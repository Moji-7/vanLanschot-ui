import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  @Input() bgClass: string | undefined;
  @Input() icon: string| undefined;
  @Input() count: number| undefined;
  @Input() label: string| undefined;
  @Input() data: number| undefined;
  constructor() {}

  ngOnInit() {}
}

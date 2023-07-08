import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  expandedItems: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  toggleItem(item: number): void {
    if (this.expandedItems.includes(item)) {
      this.expandedItems = this.expandedItems.filter(i => i !== item);
    } else {
      this.expandedItems.push(item);
    }
  }
  

}

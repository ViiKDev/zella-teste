import { Component } from '@angular/core';
import { TodoItemsService } from '../services/todo-items.service';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.sass']
})
export class TodoFilterComponent {
  constructor() { }

  completeIncomplete: number = 0;

  changeFilter() {
    if (this.completeIncomplete == 2) {
      this.completeIncomplete = 0;
      TodoItemsService.filterStatus = null;
    } else {
      if (this.completeIncomplete == 1) {
        TodoItemsService.filterStatus = false;
      } else {
        TodoItemsService.filterStatus = true;
      }
      this.completeIncomplete += 1;
    }
    TodoItemsService.refreshStatus.emit('filter');
  }
}

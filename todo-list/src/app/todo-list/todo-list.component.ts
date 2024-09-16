import { Component, OnInit } from '@angular/core';
import { TodoItemsService } from '../services/todo-items.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {
  items: any = [];
  constructor(private todoItems: TodoItemsService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.getTodoItems();
    TodoItemsService.refreshStatus.subscribe(() => { this.getTodoItems() });
  }
  getTodoItems() {
    const userId = this.authService.getUserIdFromToken();
    this.todoItems.getTodoItems(userId).subscribe(
      {
        next: (res) => {
          this.items = res;
          if (TodoItemsService.filterStatus != null) {
            this.items = res.filter((a: any) => { return a.isComplete == TodoItemsService.filterStatus });
          }
          this.items = this.todoItems.sortItemsBy(this.items, [{ key: 'createdAt', order: true }, { key: 'title', order: true }]);
        },
        error: (err) => {
          console.log("Error on get:", err);
        }
      }
    );
  }
}

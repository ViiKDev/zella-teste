import { Component, EventEmitter, Output } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { TodoItemsService } from '../services/todo-items.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.sass']
})
export class NewTodoComponent {
  utils: UtilsService = new UtilsService();

  todoItem: any = {
    title: "",
    description: "",
    createdAt: this.utils.generateDate(),
    completedAt: null,
    estimatedAt: this.utils.generateDate(),
    isComplete: false
  }

  constructor(private todoItems: TodoItemsService) {

  }

  createNewTodoItem() {
    let trimStr = this.todoItem.title.trim();
    if (trimStr != "") {
      this.todoItem.title = trimStr;
      // let deepCopyItem = this.utils.deepCopy(this.todoItem);
      // this.items.addNewTodo(deepCopyItem);
      this.todoItems.createTodoItem(this.todoItem);
    }
    this.todoItem.title = ""
  }
}

import { Component, HostListener, Input } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { TodoItemsService } from '../services/todo-items.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.sass']
})
export class TodoItemComponent {
  utils: UtilsService = new UtilsService();
  @Input() item: any = {};
  showMenu: boolean = false;

  constructor(private todoItems: TodoItemsService) {
  }

  todoItemClick() {
    if (!this.item.completedAt) {
      this.item.completedAt = this.utils.generateDate();
    }
  }
  mouseDownEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
  clickBtn(event: any) {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.todo-item-options') && !target.closest('.options-menu')) {
      this.showMenu = false;
    }
  }
  deleteItem(event: any) {
    event.stopPropagation();
    this.todoItems.deleteTodoItem(this.item);
  }
  setTodoAsFinished(event: any) {
    event.stopPropagation();
    this.item.isComplete = true;
    this.item.completedAt = this.utils.generateDate();
    this.todoItems.updateTodoItem(this.item);
  }
}

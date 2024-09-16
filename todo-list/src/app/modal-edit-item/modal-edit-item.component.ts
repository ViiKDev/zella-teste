import { Component, Input } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { TodoItemsService } from '../services/todo-items.service';

@Component({
  selector: 'app-modal-edit-item',
  templateUrl: './modal-edit-item.component.html',
  styleUrls: ['./modal-edit-item.component.sass']
})
export class ModalEditItemComponent {
  utils: UtilsService = new UtilsService();
  showModal: boolean = false;
  @Input() item: any;

  constructor(private todoItems: TodoItemsService) {
  }

  toggle() {
    this.showModal = !this.showModal;
  }
  saveItem(title: any, description: any, checkbox: any, date: any) {
    this.item.title = title.value.trim();
    this.item.description = description.value.trim();
    if (checkbox.checked) {
      this.item.isComplete = true;
      if (!this.item.completedAt) {
        this.item.completedAt = this.utils.generateDate();
      }
    } else {
      this.item.isComplete = false;
      this.item.completedAt = null;
      this.item.estimatedAt = date.value;
    }
    this.todoItems.updateTodoItem(this.item);
    this.toggle();
  }
  deleteItem() {
    this.todoItems.deleteTodoItem(this.item);
    this.toggle();
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalEditItemComponent } from './modal-edit-item/modal-edit-item.component';
import { UtilsService } from './services/utils.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { ProfileComponent } from './profile/profile.component';
import { TodoItemsService } from './services/todo-items.service';
import { TodoFilterComponent } from './todo-filter/todo-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    NewTodoComponent,
    ModalEditItemComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    TodoFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UtilsService, TodoItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

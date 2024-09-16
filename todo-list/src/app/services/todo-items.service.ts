import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  static refreshStatus = new EventEmitter();
  static filterStatus: any = null;

  private API_URL: string = 'http://localhost:5203/api/todo-items';
  getTodoItems(userId: string) {
    return this.httpClient.get<any>(`${this.API_URL}-user/${userId}`);
  }

  updateTodoItem(item: any) {
    this.httpClient.put<any>(`${this.API_URL}/${item.id}`, item).subscribe(
      {
        next: () => {
          TodoItemsService.refreshStatus.emit('update');
        },
        error: (err) => {
          console.log("Error on update:", err);
        }
      }
    );
  }

  deleteTodoItem(item: any) {
    this.httpClient.delete<any>(`${this.API_URL}/${item.id}`).subscribe(
      {
        next: () => {
          TodoItemsService.refreshStatus.emit('delete');
        },
        error: (err) => {
          console.log("Error on delete:", err);
        }
      }
    );
  }

  createTodoItem(item: any) {
    const userId = this.authService.getUserIdFromToken();
    this.httpClient.post<any>(`${this.API_URL}/${userId}`, item).subscribe(
      {
        next: () => {
          TodoItemsService.refreshStatus.emit('create');
        },
        error: (err) => {
          console.log("Error on create:", err);
        }
      }
    );
  }

  sortItemsBy(items: any, obj: { key: string, order: boolean }[]) {
    let sorted = items;
    obj.reverse().forEach(({ key, order }) => {
      sorted = items.sort((a: any, b: any) => { return a[key].toString().localeCompare(b[key].toString()) * (order ? 1 : -1) });
    })
    return sorted;
  }

  // sortItemsBy(items: any, ascending: boolean = true, field: string[] = ['createdAt']) {
  //   let sorted = items;
  //   field.reverse().forEach(f => {
  //     sorted = items.sort((a: any, b: any) => { return a[f].toString().localeCompare(b[f].toString()) * (ascending ? 1 : -1) });
  //   })
  //   return sorted;
  // }

  ascendingDateSort(items: any) {
    let sorted = items.sort((a: any, b: any) => { return (new Date(a.createdAt).getTime()) - (new Date(b.createdAt)).getTime(); })
    return sorted;
  }

  descendingDateSort(items: any) {
    let sorted = items.sort((a: any, b: any) => { return (new Date(b.createdAt).getTime()) - (new Date(a.createdAt)).getTime(); })
    return sorted;
  }
}

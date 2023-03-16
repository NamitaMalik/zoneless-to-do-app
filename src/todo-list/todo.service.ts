import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly TODO_LIST_KEY = 'todoList';

  constructor() {}

  getTodos(): Todo[] {
    const todoList = localStorage.getItem(this.TODO_LIST_KEY);
    return todoList ? JSON.parse(todoList) : [];
  }

  addTodo(todo: Todo): void {
    const todoList = this.getTodos();
    todoList.push(todo);
    localStorage.setItem(this.TODO_LIST_KEY, JSON.stringify(todoList));
  }

  updateTodoList(todoList: Todo[]): void {
    localStorage.setItem(this.TODO_LIST_KEY, JSON.stringify(todoList));
  }

  deleteTodoList(todoList: Todo[]): void {
    localStorage.setItem(this.TODO_LIST_KEY, JSON.stringify(todoList));
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todoForm: FormGroup = new FormGroup({
    todoInput: new FormControl('', Validators.required),
  });
  todoList: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList(): void {
    this.todoList = this.todoService.getTodos();
  }

  onSubmit(): void {
    const todoInput = this.todoForm.get('todoInput')?.value.trim();
    if (!todoInput) {
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      description: todoInput,
    };
    this.todoList.push(newTodo);
    this.todoService.addTodo(newTodo);
    this.todoForm.reset();
    this.cdr.detectChanges();
  }

  onDelete(todo: Todo): void {
    const index = this.todoList.indexOf(todo);
    if (index > -1) {
      this.todoList.splice(index, 1);
    }
    this.todoService.deleteTodoList(this.todoList);
    this.cdr.detectChanges();
  }
}

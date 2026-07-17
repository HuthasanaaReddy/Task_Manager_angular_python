import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from './task';
import { TaskService } from './taskservice';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./app.css']  
})
export class App implements OnInit {

  constructor(private fb: FormBuilder, private svc: TaskService) { }
  tasks$!: Observable<Task[]>;
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      description: [''],
      status: ['Open']
    });

    this.load();
  }

load() {
    this.tasks$ = this.svc.getTasks();
  }
  save() {
    const task: any = this.form.value;
    if (task.id) {
      this.svc.updateTask(task).subscribe(() => { this.load(); this.form.reset({ id: 0, status: 'Open' }); });
    } else {
      task.id = Date.now();
      this.svc.createTask(task).subscribe(() => { this.load(); this.form.reset({ id: 0, status: 'Open' }); });
    }
  }
  edit(t: any) { this.form.patchValue(t); 

  }

  delete(id: number) { 
    this.svc.deleteTask(id).subscribe(() => this.load()); 
  }
}

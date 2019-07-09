import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentComponent } from './components/student/student.component';

const appRoutes: Routes = [
  { path: 'students', component: StudentComponent },
  { path: 'create-new-student', component: StudentFormComponent },
  { path: 'students/:id/edit', component: StudentFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

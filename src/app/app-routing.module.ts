import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentComponent } from './components/student/student.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentComponent },
  { path: 'students/create', component: StudentFormComponent },
  { path: 'students/:id/edit', component: StudentFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentformComponent } from './components/studentform/studentform.component';
import { StudentComponent } from './components/student/student.component';

const appRoutes: Routes = [
  { path: 'student', component: StudentComponent },
  { path: 'forms', component: StudentformComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

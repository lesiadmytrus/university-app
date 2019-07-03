import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentformComponent } from './components/studentform/studentform.component';
import { StudentComponent } from './components/student/student.component';
import { DetailsComponent } from './components/details/details.component';

const appRoutes: Routes = [
  { path: 'student', component: StudentComponent },
  // { path: 'teacher', component: TeacherComponent },
  // { path: 'group', component: GroupComponent },
  // { path: 'course', component: CourseComponent },
  { path: 'forms', component: StudentformComponent },
  // { path: 'details/:name', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

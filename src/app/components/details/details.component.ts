import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() student: Student;
  constructor() { }

  ngOnInit() {
  }
  
}

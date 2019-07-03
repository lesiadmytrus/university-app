import { Group } from './group.model';
import { Teacher } from './teacher.model';
import { Course } from './course.model';

export class Student {
    public _id: number;
    public firstName: string;
    public lastName: string;
    public age: number;
    public email: string | number;
    public phoneNumber: number;
    public country: string;
    public gender: string;
    public dateOfBirth: string;
    public courses?: Course;
    public groups?: Group;
    public teachers?: Teacher; 
}

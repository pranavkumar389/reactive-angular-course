import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient,
  ) { }

  loadCourseList(): Observable<Array<Course>> {
    return this.http.get('/api/courses')
      .pipe(
        shareReplay(),
        map((response: { payload: Array<Course> }) => response.payload)
      )
  }

  saveCourse(courseId: string, changes: Partial<Course>) {
    return this.http.put(`/api/courses/${courseId}`, changes)
      .pipe(
        shareReplay()
      )
  }

}
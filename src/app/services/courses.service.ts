import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";

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

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons', {
      params: {
        filter: search,
        pageSize: '100'
      }
    })
      .pipe(
        map(res => res['payload']),
        shareReplay()
      )
  }

  loadCorseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseId}`)
      .pipe(
        shareReplay()
      );
  }

  loadAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons', {
      params: {
        pageSize: '10000',
        courseId: courseId.toString()
      }
    })
      .pipe(
        map(res => res['payload']),
        shareReplay()
      )
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// cSpell: words subreddit
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(subreddit: string): Observable<any> {
    return this.http.get('https://www.reddit.com/r/' + subreddit + '/.json?limit=10')
  }
}

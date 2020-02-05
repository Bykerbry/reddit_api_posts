import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { IPost } from './post.interface'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// cSpell: words subreddit
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(subreddit: string) {
    return this.http.get('https://www.reddit.com/r/' + subreddit + '/.json?limit=10').pipe(
      map((res: any) => {
        let postArr: IPost[] = [];
        res.data.children.forEach((post: any) => {
           postArr.push({
            title: post.data.title,
            imgUrl: post.data.thumbnail,
            imgH: post.data.thumbnail_height,
            imgW: post.data.thumbnail_width,
            link: post.data.url
          });
        });
        return postArr;
      }),
      catchError(err => this.errorHandler(err))
  )}

  errorHandler(error: any) {
    console.log(error);
    return throwError(error)
  }
  
  getAutoComplete(userText: string) {
    return this.http.get("http://www.reddit.com/api/subreddit_autocomplete/.json?include_over_18=true&include_profiles=false&query=" + userText)
  }
}



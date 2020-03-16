import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { MatAutocompleteTrigger } from '@angular/material';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError} from "rxjs/operators";
import { PostService } from '../post.service';
import { IPost } from '../post.interface';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

// cSpell: words subreddit subreddits
export class MainComponent implements OnInit {

  postArr$: Observable<IPost[]>
  subredditTitle: string;
  error: boolean;
  suggestions: any;
  suggestionsArr: string[];
  subredditControl = new FormControl('');

  @ViewChild(MatAutocompleteTrigger, {static: true}) autocomplete: MatAutocompleteTrigger;

  constructor(private http: HttpClient, private _postService: PostService) { }

  ngOnInit() {
    this.getSubreddit('aww');
  }

  getSubreddit(subreddit: string) {
    this.subredditTitle = subreddit.substring(0,1).toUpperCase() + subreddit.substring(1);
    subreddit = subreddit.replace(' ', '');
    this.postArr$ = this.getPosts(subreddit)
    this.autocomplete.closePanel();
  };

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
        this.error = false;
        return postArr;
      }),
      catchError(err => {
        console.log('There was an error.',err);
        throwError(err)
        this.error = true;
        return of([])
      })
  )}

  getSuggestions(currentText: string) {
    this._postService.getAutoComplete(currentText).subscribe( response => {
      this.suggestionsArr = [];
      this.suggestions = response;
      this.suggestions.subreddits.map( sub => this.suggestionsArr.push(sub.name));
    });
  };
};

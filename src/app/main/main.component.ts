import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../post.service';
import { FormControl } from '@angular/forms'
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

// cSpell: words subreddit subreddits
export class MainComponent implements OnInit {

  data: any;
  postData: any[];
  subredditTitle: string;
  error: boolean;

  suggestions: any;
  suggestionsArr: string[];
  subredditControl = new FormControl('');

  @ViewChild(MatAutocompleteTrigger, {static: true}) autocomplete: MatAutocompleteTrigger;

  constructor(private _postService: PostService) { }

  ngOnInit() {
    this.getSubreddit('aww');
  }

  getSubreddit(subreddit: string) {
    this.subredditTitle = subreddit.substring(0,1).toUpperCase() + subreddit.substring(1);
    subreddit = subreddit.replace(' ', '');
    this._postService.getPosts(subreddit).subscribe( response => {
        this.data = response;
        this.postData = this.data.data.children;
        this.error = false;
    }, error => {
      this.error = true;
      console.log(error);
    });
    this.autocomplete.closePanel();
  };

  getSuggestions(currentText: string) {
    this._postService.getAutoComplete(currentText).subscribe( response => {
      this.suggestionsArr = [];
      this.suggestions = response;
      this.suggestions.subreddits.map( sub => this.suggestionsArr.push(sub.name));
    });
  };
};

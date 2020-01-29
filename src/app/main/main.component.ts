import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

// cSpell: words subreddit
export class MainComponent implements OnInit {

  data: any;
  postData: any[];
  subredditTitle: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getSubreddit('aww')
  }
  getSubreddit(subreddit: string) {
    this.subredditTitle = subreddit.substring(0,1).toUpperCase() + subreddit.substring(1);
    subreddit = subreddit.replace(' ', '')
    this.http.get('https://www.reddit.com/r/' + subreddit + '/.json').subscribe( response => {
        this.data = response;
        this.postData = this.data.data.children;
    })
  }

}

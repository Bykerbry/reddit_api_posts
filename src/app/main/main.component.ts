import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service'

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
  error: boolean;

  constructor(private _postService: PostService) { }

  ngOnInit() {
    this.getSubreddit('aww')
  }
  getSubreddit(subreddit: string) {
    this.subredditTitle = subreddit.substring(0,1).toUpperCase() + subreddit.substring(1);
    subreddit = subreddit.replace(' ', '')
    this._postService.getPosts(subreddit).subscribe( response => {
        this.data = response;
        this.postData = this.data.data.children;
        this.error = false;
    }, error => {
      this.error = true;
      console.log(error)
    })
  }
}

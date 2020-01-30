import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: any;
 

  constructor() { }

  getImgSize(post: any) {
    return {
      height: `${post.thumbnail_height}px`,
      width: `${post.thumbnail_width}px`
    }
  }
  isUrl(url: string) {
    return url.substring(0, 8) === 'https://'
  }

  ngOnInit() {
  }

}

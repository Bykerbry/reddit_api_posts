import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: IPost;
 
  constructor() { }

  getImgSize(post: IPost) {
    return {
      height: `${post.imgH}px`,
      width: `${post.imgW}px`
      // height: `${post.thumbnail_height}px`,
      // width: `${post.thumbnail_width}px`
    }
  }
  isUrl(url: string) {
    return url.substring(0, 8) === 'https://'
  }

  ngOnInit() {
  }

}

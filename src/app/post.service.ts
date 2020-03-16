import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// cSpell: words subreddit
export class PostService {

  constructor(private http: HttpClient) { }
  
  getAutoComplete(userText: string) {
    return this.http.get("http://www.reddit.com/api/subreddit_autocomplete/.json?include_over_18=true&include_profiles=false&query=" + userText)
  }
}



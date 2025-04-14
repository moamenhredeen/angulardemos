import {Component, inject} from '@angular/core';
import {PostService} from '$core/services/post.service';
import {AsyncPipe} from '@angular/common';
import {PostComponent} from './post/post.component';

@Component({
  selector: 'app-blog',
  imports: [
    AsyncPipe,
    PostComponent
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  private _postService = inject(PostService);
  posts$ = this._postService.getPosts();
}

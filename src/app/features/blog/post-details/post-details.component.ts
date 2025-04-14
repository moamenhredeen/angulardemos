import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '$core/services/post.service';
import {Post, PostComment} from '$core/types/post';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {CommentComponent} from './comment/comment.component';

@Component({
  selector: 'app-post-details',
  imports: [
    AsyncPipe,
    CommentComponent
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _postService = inject(PostService);
  post$!: Observable<Post>;
  comment$!: Observable<PostComment[]>;

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.post$ = this._postService.getPostById(params['id']);
      this.comment$ = this._postService.getPostComments(params['id']);
    })
  }
}

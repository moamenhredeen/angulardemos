import { Component, Input } from '@angular/core';
import { Post } from '$core/types/post';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [
    RouterLink
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  count = 0;


  @Input({required: true}) post!: Post;



  clickHandler($event: MouseEvent) {
    this.count++;
  }
}

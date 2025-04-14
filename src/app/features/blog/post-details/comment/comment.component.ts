import {Component, Input} from '@angular/core';
import {PostComment} from '$core/types/post';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input({required: true}) comment!: PostComment;
}

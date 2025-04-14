import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Post, PostComment} from '$core/types/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly BASE_URL = "https://jsonplaceholder.typicode.com/";

  constructor(private _http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this._http.get<Post[]>(`${this.BASE_URL}/posts`)
  }

  getPostById(id: number): Observable<Post> {
    return this._http.get<Post>(`${this.BASE_URL}/posts/${id}`)
  }

  getPostComments(id: number): Observable<PostComment[]> {
    return this._http.get<PostComment[]>(`${this.BASE_URL}/posts/${id}/comments`)
  }

  updatePost(post: Post): Observable<Post> {
    return this._http.put<Post>(`${this.BASE_URL}/posts/${post.id}`, post)
  }

  deletePost(postId: number): Observable<void> {
    return this._http.delete<void>(`${this.BASE_URL}/posts/${postId}`)
  }
}

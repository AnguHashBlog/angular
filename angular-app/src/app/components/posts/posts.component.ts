import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { PageInfo, Post } from '../../models/post';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterLink, AsyncPipe, InfiniteScrollDirective, SlicePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  blogURL!: string;
  posts!: Post[];
  blogService: BlogService = inject(BlogService);
  paginationInfo: PageInfo = { hasNextPage: true, endCursor: '' };
  isHiddenLoadMore: boolean = true;
  isActiveInfiniteScroll: boolean = false;

  ngOnInit() {
    this.blogURL = this.blogService.getBlogURL();
    this.loadPosts();
  }

  private loadPosts(): void {
    this.blogService.getPostsWithPagination(this.blogURL, this.paginationInfo.endCursor).subscribe(postsPageInfo => {
      this.paginationInfo = postsPageInfo.pagination;
      this.isHiddenLoadMore = !postsPageInfo.pagination.hasNextPage;
      this.posts = postsPageInfo.posts;
    });
  }

  loadMorePosts(): void {
    if (!this.paginationInfo.hasNextPage) return;
    this.isHiddenLoadMore = true;
    this.blogService.getPostsWithPagination(this.blogURL, this.paginationInfo.endCursor).pipe(
    ).subscribe(newPosts => {
      this.isActiveInfiniteScroll = true;
      this.paginationInfo = newPosts.pagination;
      this.posts = this.posts.concat(newPosts.posts);
    });
  }
}

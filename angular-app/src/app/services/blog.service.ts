import {Injectable, signal} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  GET_AUTHOR_INFO,
  GET_BLOG_INFO,
  GET_POSTS,
  GET_POSTS_IN_SERIES,
  GET_SERIES_LIST,
  GET_SINGLE_POST
} from '../graphql.operations';
import { Author, Post, PostsWithPageInfo, SeriesList } from '../models/post';
import { BlogInfo,  } from '../models/blog-info';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogURL: string = "hashnode.anguhashblog.com";
  private readonly localStorageKey = 'userBlogURL';
  defaultOgImageUrl = "/assets/images/angular-anguhashblog-dark.jpg";
  currentPost = signal<Post | null>(null);

  constructor(private apollo: Apollo) { }

  getBlogURL(): string {
    return localStorage.getItem(this.localStorageKey) || 'hashnode.anguhashblog.com';
  }

  setBlogURL(newBlogURL: string): void {
    localStorage.setItem(this.localStorageKey, newBlogURL);
    this.blogURL = newBlogURL;
  }

  resetBlogURL(): void {
    localStorage.removeItem(this.localStorageKey);
    this.blogURL = 'hashnode.anguhashblog.com';
  }

  getBlogInfo(host: string): Observable<BlogInfo> {
    return this.apollo
    .watchQuery<any>({
      query: GET_BLOG_INFO,
      variables: { host: host },
    })
    .valueChanges.pipe(map(({ data }) => data.publication));
  }

  getAuthorInfo(host: string): Observable<Author> {
    return this.apollo
    .watchQuery<any>({
      query: GET_AUTHOR_INFO,
      variables: { host: host },
    })
    .valueChanges.pipe(map(({ data }) => data.publication.author));
  }

  getPosts(host: string, after: string): Observable<PostsWithPageInfo> {
    return this.apollo
      .watchQuery<any>({
        query: GET_POSTS,
        variables:{
          host: host,
          after: after
        }
      })
      .valueChanges.pipe(
        map(({ data }) => {
          const { edges, pageInfo } = data.publication.posts;
          return {
            posts: edges.map((edge: { node: any; }) => edge.node),
            pagination: pageInfo
          };
        }));
  }

  getSeriesList(host: string): Observable<SeriesList[]> {
    return this.apollo
    .watchQuery<any>({
      query: GET_SERIES_LIST,
      variables: { host: host },
    })
    .valueChanges.pipe(map(({ data }) => data.publication.seriesList.edges.map((edge: { node: any; }) => edge.node)));
  }

  getPostsInSeries(host: string, slug: string, after: string = ""): Observable<PostsWithPageInfo> {
    return this.apollo
    .watchQuery<any>({
      query: GET_POSTS_IN_SERIES,
      variables: {
        host: host,
        slug: slug,
        after: after
      },
    }).valueChanges.pipe(
      map(({ data }) => {
        const { edges, pageInfo } = data.publication.series.posts;
        return {
          posts: edges.map((edge: { node: any; }) => edge.node),
          pagination: pageInfo
        };
      }));
  }


  getSinglePost(host: string, slug: string ): Observable<Post>{
    return this.apollo
    .watchQuery<any>({
      query: GET_SINGLE_POST,
      variables: {
        host: host,
        slug: slug
      },
    })
    .valueChanges.pipe(
      map(({ data }) => {
        const post = data.publication.post;
        return post;
      })
    );
  }

}

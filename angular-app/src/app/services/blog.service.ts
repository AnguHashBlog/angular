import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
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
import { Author, Post, PostsPageInfo, SeriesList } from '../models/post';
import { BlogInfo,  } from '../models/blog-info';
import { DOCUMENT, isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogURL: string = "hashnode.anguhashblog.com";
  private readonly localStorageKey = 'userBlogURL';
  defaultOgImageUrl = "/assets/images/angular-anguhashblog-dark.jpg";

	constructor(
		private apollo: Apollo,
		@Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
	) {}

	getBlogURL(): string {
		if (isPlatformBrowser(this.platformId)) {
			return (
				localStorage.getItem(this.localStorageKey) ||
				"hashnode.anguhashblog.com"
			);
		}
		return "hashnode.anguhashblog.com";
	}

	setBlogURL(newBlogURL: string): void {
		if (isPlatformBrowser(this.platformId)) {
			localStorage.setItem(this.localStorageKey, newBlogURL);
		}
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

  getPosts(host: string, after: string): Observable<PostsPageInfo> {
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

  getPostsInSeries(host: string, slug: string, after: string = ""): Observable<PostsPageInfo> {
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
        this.updateOgImageMetaTag(post.coverImage.url); // Update og:image meta tag
        return post;
      })
    );
  }

  updateOgImageMetaTag(imageUrl: string): void {
    const metaTag = this.document.querySelector('meta[property="og:image"]');
    const metaTagSecure = this.document.querySelector('meta[property="og:image:secure_url"]');
    if (metaTag) {
      metaTag.setAttribute('content', imageUrl);
    }
    if (metaTagSecure) {
      metaTagSecure.setAttribute('content', imageUrl);
    }
  }

  resetOgImageMetaTagToDefault(): void {
    this.updateOgImageMetaTag(this.defaultOgImageUrl);
  }

  resetOgImageMetaTagToNone(): void {
    this.updateOgImageMetaTag('');
  }
}

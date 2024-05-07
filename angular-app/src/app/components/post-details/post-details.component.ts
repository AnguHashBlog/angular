import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import {AsyncPipe, DatePipe, ViewportScroller} from '@angular/common';
import { SanitizerHtmlPipe } from '../../pipes/sanitizer-html.pipe';
import { Post } from '../../models/post';
import { Observable, Subscription } from 'rxjs';
import { ClipboardCopyButtonDirective } from '../../directives/clipboard-copy-button.directive';
import { ThemeService } from '../../services/theme.service';
import { BlogInfo } from '../../models/blog-info';
import { YoutubeVideoEmbedDirective } from '../../directives/youtube-video-embed.directive';
import { Meta } from '@angular/platform-browser';

@Component({
	selector: "app-post-details",
	standalone: true,
	imports: [
		AsyncPipe,
		DatePipe,
    SanitizerHtmlPipe,
		ClipboardCopyButtonDirective,
    YoutubeVideoEmbedDirective
	],
	templateUrl: "./post-details.component.html",
	styleUrl: "./post-details.component.scss",
})
export class PostDetailsComponent implements OnInit, OnDestroy {
	blogURL!: string;
	blogInfo!: BlogInfo;
	blogName: string = "";
	post$!: Observable<Post>;
  postCoverImage!: string;
	themeService: ThemeService = inject(ThemeService);
  private viewportScroller: ViewportScroller  = inject(ViewportScroller);
	private blogService = inject(BlogService);
  private meta: Meta = inject(Meta);
	private querySubscription?: Subscription;

	@Input({ required: true }) postSlug!: string;

	ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0,0])
		this.blogURL = this.blogService.getBlogURL();
		this.querySubscription = this.blogService
			.getBlogInfo(this.blogURL)
			.subscribe((data) => {
				this.blogInfo = data;
				this.blogName = this.blogInfo.title;
			});
		this.post$ = this.blogService.getSinglePost(this.blogURL, this.postSlug);

    this.meta.updateTag({ name: 'description', content: 'This is a blog post' });
    this.meta.updateTag({ name: 'image', content: '/assets/anguhashblog-logo-purple-bgr.jpg' });
	}

	toggleTheme(): void {
		this.themeService.updateTheme();
	}

	ngOnDestroy(): void {
		this.querySubscription?.unsubscribe();
    this.meta.updateTag({ name: 'description', content: 'Angular Template for Hashnode Blogs' });
    this.meta.updateTag({ name: 'image', content: '/assets/angular-anguhashblog-dark.jpg' });
	}
}

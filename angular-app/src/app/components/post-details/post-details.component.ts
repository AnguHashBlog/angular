import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SanitizerHtmlPipe } from '../../pipes/sanitizer-html.pipe';
import { Post } from '../../models/post';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { ClipboardCopyButtonDirective } from '../../directives/clipboard-copy-button.directive';
import { ThemeService } from '../../services/theme.service';
import { FooterComponent } from '../footer/footer.component';
import { BlogInfo } from '../../models/blog-info';
import { YoutubeVideoEmbedDirective } from '../../directives/youtube-video-embed.directive';
import { Meta } from '@angular/platform-browser';

@Component({
	selector: "app-post-details",
	standalone: true,
	imports: [
		FooterComponent,
		RouterLink,
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
  private route = inject(ActivatedRoute);
	private router = inject(Router);
  private meta: Meta = inject(Meta);
	private blogService = inject(BlogService);
	private querySubscription?: Subscription;

	@Input({ required: true }) postSlug!: string;

	ngOnInit(): void {
		this.blogURL = this.blogService.getBlogURL();
		this.querySubscription = this.blogService
			.getBlogInfo(this.blogURL)
			.subscribe((data) => {
				this.blogInfo = data;
				this.blogName = this.blogInfo.title;
			});
		this.post$ = this.blogService.getSinglePost(this.blogURL, this.postSlug);
    // this.post$.subscribe((post) => {
    //   this.postCoverImage = post.coverImage.url;
    //   this.blogService.updateOgImageMetaTag(this.postCoverImage);
    // });
	}

	toggleTheme(): void {
		this.themeService.updateTheme();
	}

	ngOnDestroy(): void {
		this.querySubscription?.unsubscribe();
    // this.blogService.resetOgImageMetaTagToDefault();
	}
}

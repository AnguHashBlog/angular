import { Component, Inject, OnDestroy, OnInit, inject,HostListener } from "@angular/core";
import { CommonModule, DOCUMENT,ViewportScroller } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { ThemeService } from "./services/theme.service";
import { BlogInfo } from "./models/blog-info";
import { Subscription } from "rxjs";
import { BlogService } from "./services/blog.service";
import { Meta } from "@angular/platform-browser";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [CommonModule, HeaderComponent, FooterComponent, RouterOutlet],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit, OnDestroy {
	// title = "angular-app";
  blogURL!: string;
	blogInfo!: BlogInfo;
	siteFavicon: any;
	themeService: ThemeService = inject(ThemeService);
	blogService: BlogService = inject(BlogService);
  private meta: Meta = inject(Meta);
	private querySubscription?: Subscription;
	showScrollButton: boolean = false;
	private readonly scroller = inject(ViewportScroller);
  constructor(@Inject(DOCUMENT) private document: Document) {}

	ngOnInit(): void {
    this.blogURL = this.blogService.getBlogURL();
    this.siteFavicon = this.document.querySelector('link[rel="icon"]') as HTMLLinkElement;
		this.querySubscription = this.blogService
			.getBlogInfo(this.blogURL)
			.subscribe((data) => {
				this.blogInfo = data;
				if (this.blogInfo.isTeam && this.blogInfo.favicon) {
					this.siteFavicon.href = this.blogInfo.favicon;
				} else {
					this.siteFavicon.href = "favicon.ico";
				}
				if (!this.blogInfo.isTeam) {
					this.blogService.getAuthorInfo(this.blogURL).subscribe((data) => {
						if (data.profilePicture) {
							this.siteFavicon.href = data.profilePicture;
						} else {
							this.siteFavicon.href = "favicon.ico";
						}
					});
				}
			});

      this.meta.addTags([
        { name: 'description', property: "og:description",  content: 'Angular Template for Hashnode Blogs' },
        { name: 'image', property: "og:image", content: '/assets/angular-anguhashblog-dark.jpg' },
        { charset: 'UTF-8' }
      ]);
	}

	@HostListener('window:scroll', [])
	onWindowScroll() {
		const yOffset = window.pageYOffset || document.documentElement.scrollTop;
		if (yOffset > 300) { 
			this.showScrollButton = true;
		} else {
			this.showScrollButton = false;
		}
	}

	scrollToTop() {
		this.scroller.scrollToPosition([0, 0]);
	}

	ngOnDestroy(): void {
		this.querySubscription?.unsubscribe();
	}
}

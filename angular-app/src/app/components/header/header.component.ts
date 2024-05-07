import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { BlogService } from "../../services/blog.service";
import { AsyncPipe, KeyValuePipe } from "@angular/common";
import { BlogInfo, BlogLinks } from "../../models/blog-info";
import {
	ActivatedRoute,
	NavigationEnd,
	Router,
	RouterLink,
} from "@angular/router";
import { SeriesList } from "../../models/post";
import { FollowDialogComponent } from "../../partials/follow-dialog/follow-dialog.component";
import { SidenavComponent } from "../sidenav/sidenav.component";
import { ModalService } from "../../services/modal.service";
import { IconService } from "../../services/icon.service";
import { SvgIconComponent } from "../../partials/svg-icon/svg-icon.component";
import { SettingsDialogComponent } from "../../partials/settings-dialog/settings-dialog.component";
import { ShareDialogComponent } from "../../partials/share-dialog/share-dialog.component";
import { ThemeSwitcherComponent } from "../../partials/theme-switcher/theme-switcher.component";
import {AuthorsDialogComponent} from "../post-details/authors-dialog/authors-dialog.component";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [
		KeyValuePipe,
		AsyncPipe,
		RouterLink,
		ThemeSwitcherComponent,
		SidenavComponent,
		FollowDialogComponent,
		SvgIconComponent,
		SettingsDialogComponent,
		ShareDialogComponent,
    AuthorsDialogComponent,
	],
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
	showMainHeader: boolean = true;
	sidenavOpen: boolean = false;
	blogURL!: string;
	blogInfo!: BlogInfo;
	blogName: string = "";
	// start with default image to prevent 404 when returning from post-details page
	blogImage: string = "/assets/images/anguhashblog-logo-purple-bgr.jpg";
	blogSocialLinks!: BlogLinks;
	seriesList!: SeriesList[];
	themeService: ThemeService = inject(ThemeService);
	blogService: BlogService = inject(BlogService);
	modalService: ModalService = inject(ModalService);
	iconService: IconService = inject(IconService);
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private querySubscription?: Subscription;

	ngOnInit(): void {
		this.blogURL = this.blogService.getBlogURL();
		this.querySubscription = this.blogService
			.getBlogInfo(this.blogURL)
			.subscribe((data) => {
				this.blogInfo = data;
				this.blogName = this.blogInfo.title;
				this.blogImage =
					this.blogInfo.isTeam && this.blogInfo.favicon
						? (this.blogImage = this.blogInfo.favicon)
						: "/assets/images/anguhashblog-logo-purple-bgr.jpg";
				if (!this.blogInfo.isTeam) {
					this.blogService.getAuthorInfo(this.blogURL).subscribe((data) => {
						this.blogImage = data.profilePicture
							? data.profilePicture
							: "/assets/images/anguhashblog-logo-purple-bgr.jpg";
					});
				}
				const { __typename, ...links } = data.links;
				this.blogSocialLinks = links;
			});
		this.querySubscription = this.blogService
			.getSeriesList(this.blogURL)
			.subscribe((data) => {
				this.seriesList = data;
			});
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.showMainHeader =
					!this.route.snapshot.firstChild?.paramMap.has("postSlug");
			}
		});
	}

	// toggleTheme(): void {
	// 	this.themeService.updateTheme();
	// }

	toggleSidenav() {
		this.sidenavOpen = !this.sidenavOpen;
	}

	getIcon(key: string) {
		return this.iconService.getIcon(key);
	}

	ngOnDestroy(): void {
		this.querySubscription?.unsubscribe();
	}
}

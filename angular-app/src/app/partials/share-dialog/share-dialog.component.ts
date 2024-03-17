import { Component, OnInit, inject } from "@angular/core";
import { BlogService } from "../../services/blog.service";
import { ModalService } from "../../services/modal.service";
import { Observable, from, timer } from "rxjs";
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { Post } from "../../models/post";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

@Component({
	selector: "app-share-dialog",
	standalone: true,
	imports: [SvgIconComponent],
	templateUrl: "./share-dialog.component.html",
	styleUrl: "./share-dialog.component.scss",
})
export class ShareDialogComponent implements OnInit {
	currentUrl: string = "";
  blogURL!: string;
  post$!: Observable<Post>;
  postSlug!: string;
  postCoverImage!: string;
  linkedinIcon: string = "linkedin";
  twitterIcon: string = "twitter";
	modalService: ModalService = inject(ModalService);
	blogService: BlogService = inject(BlogService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

	ngOnInit(): void {
    this.currentUrl = window.location.href;
    // this.blogURL = this.blogService.getBlogURL();
    // this.postSlug = this.currentUrl.split("/").pop() ?? "";
    // this.post$ = this.blogService.getSinglePost(this.blogURL, this.postSlug);
    // this.post$.subscribe((post) => {
    //   if (post.coverImage?.url) {
    //     this.postCoverImage = post.coverImage.url;
    //   }
    //   this.blogService.updateOgImageMetaTag(this.postCoverImage);
    // });
	}

  copyPostURL(): void {
    // this.blogService.updateOgImageMetaTag(this.postCoverImage);
		from (
			navigator.clipboard.writeText(this.currentUrl)
		).subscribe({
			next: () => {
        const buttonElement = document.querySelector(".copy-btn") as HTMLButtonElement;
				buttonElement.textContent = "✅ Post Link Copied";
				timer(1500).subscribe(() => (buttonElement.textContent = "Copy Post Link"));
			},
			error: (err: any) => console.error('Failed to copy: ', err),
		});
	}

  shareOnLinkedIn(): void {
    // this.blogService.updateOgImageMetaTag(this.postCoverImage);
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.currentUrl)}`;
    window.open(linkedinShareUrl, '_blank');
  }

  shareOnTwitter(): void {
    // this.blogService.updateOgImageMetaTag(this.postCoverImage);
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.currentUrl)}`;
    window.open(twitterShareUrl, '_blank');
  }
}

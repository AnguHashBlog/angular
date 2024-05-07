import {Component, inject} from '@angular/core';
import {ModalService} from "../../../services/modal.service";
import {BlogService} from "../../../services/blog.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-authors-dialog',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './authors-dialog.component.html',
  styleUrl: './authors-dialog.component.scss'
})
export class AuthorsDialogComponent {
  modalService: ModalService = inject(ModalService);
  blogService = inject(BlogService);
  currentPost=this.blogService.currentPost;
}

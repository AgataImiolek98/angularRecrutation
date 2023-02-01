import { Component, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CommentDetails } from "src/app/page/models/costs.config.interface";


@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
    faPen = faPen;
    faTrash = faTrash;
    showMe: boolean = false;
    commentText: string = "";
    @Input() comment: CommentDetails


    defaultSelectValue: string = "Select comment type"
    commentForm: FormGroup = new FormGroup({
      'selectCommentControl': new FormControl(this.defaultSelectValue),
      'inputCommentControl': new FormControl(null)
    })

    ngOnInit () {
        this.commentForm.get('inputCommentControl').disable();
    }

    enableCommentInput() {
        if(this.commentForm.get('selectCommentControl').value === this.defaultSelectValue) {
        this.commentForm.get('inputCommentControl').disable();
        this.commentForm.get('inputCommentControl').reset();
        } else {
          this.commentForm.get('inputCommentControl').enable()
        }  
      }
}
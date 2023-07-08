import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VidoeService } from 'src/app/services/vidoe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  character: any;
  commentForm: FormGroup;
  icon:any;
  videos$: Observable<any[]>;
  constructor(
    private route: ActivatedRoute,
    private characterService: CharactersService,
    private fb: FormBuilder,
    private videoService: VidoeService
  ) {
    this.commentForm = this.fb.group({
      comment: [''] // Add the comment form control
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((val) => {
      const characterId = val['id'];
      if (characterId) {
        this.loadCharacter(characterId);
      }
    });
    this.videos$ = this.videoService.getAllVideos();
    
  }

  loadCharacter(characterId: string): void {
    this.characterService.loadData().subscribe((characters) => {
      if (Array.isArray(characters)) {
        for (let i = 0; i < characters.length; i++) {
          if (characters[i].id === characterId) {
            this.character = characters[i];
            if (!this.character.data.comments) {
              // Initialize comments field if it doesn't exist
              this.character.data.comments = [];
            }
       
            fetch(`https://unofficialdbzapi.cyclic.app/api/${this.character.data.name}`)
            .then(response => response.json())
            .then(data =>{ 
              this.icon = data.pic;

            })
            .catch(error => console.error(error));
            break;

          }
        }
      }
    });
  }

  addComment() {
    const comment = this.commentForm.value.comment;
    const characterId = this.character?.id;

    if (characterId && comment) {
      this.characterService.addComment(this.character, comment);
      this.commentForm.patchValue({ comment: '' }); // Clear the comment input field
    }
  }
}

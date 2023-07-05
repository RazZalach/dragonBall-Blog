import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-all-character',
  templateUrl: './all-character.component.html',
  styleUrls: ['./all-character.component.css']
})
export class AllCharacterComponent implements OnInit {
  characterArray: any;
  constructor(private characterService: CharactersService) { }

  ngOnInit(): void {
    this.characterService.loadData().subscribe((val) => {
      console.log(val);
      this.characterArray = val;
    });
  }

  onDelete(postImgPath, id) {
    this.characterService.deleteImage(postImgPath, id);
  }

  onFeatured(id, value) {
    const featuredData = {
      isFeatured: value,
    };
    this.characterService.markFeatured(id, featuredData);
  }

}

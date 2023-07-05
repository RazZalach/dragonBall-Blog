import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  originalCharacterArray: any; // Variable to store the unfiltered character array
  characterArray: any;

  constructor(private characterService: CharactersService) { }

  ngOnInit(): void {
    this.characterService.loadData().subscribe((val) => {
      console.log(val);
      this.originalCharacterArray = val; // Store the original array
      this.characterArray = val;
    });
  }

  onCategorySelected(category: any) {
    if (category) {
      this.characterArray = this.originalCharacterArray.filter((character: any) => {
        return character.data.category.category === category.data.category;
      });
    } else {
      // If no category is selected, reset characterArray to the original unfiltered array
      this.characterArray = this.originalCharacterArray;
    }
  }
  searchCharacters(searchTerm: string) {
    if (searchTerm.length >= 2) {
      this.characterArray = this.originalCharacterArray.filter((character: any) => {
        const nameMatch = character.data.name.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = character.data.category.category.toLowerCase().includes(searchTerm.toLowerCase());
        const descriptionMatch = character.data.description.substring(0, 10).toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || categoryMatch || descriptionMatch;
      });
    } else {
      this.characterArray = this.originalCharacterArray;
    }
  }
  
}

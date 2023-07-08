import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-header-store',
  templateUrl: './header-store.component.html',
  styleUrls: ['./header-store.component.css']
})
export class HeaderStoreComponent implements OnInit {
  categoryArray: any;
  selectedCategory: any;
  searchResults: any[] = [];

  @Output() categorySelected = new EventEmitter<any>();

  constructor(private categoryService: CategoriesService, private characterService: CharactersService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
     
      this.categoryArray = val;
    });
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }

  searchCharacters(searchTerm: string) {
    if (searchTerm.length >= 3) {
      this.characterService.searchCharacters(searchTerm).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
  }

  selectAutocompleteResult(result: any) {
    // Perform the action when an autocomplete result is selected
   
    // Clear the search input and autocomplete results
    this.searchResults = [];
    // Perform further actions, such as navigating to a character detail page
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Character } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/characters.service';


@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.css']
})
export class NewCharacterComponent implements OnInit {
  categories: any;
  imgSrc: any = './assets/image_placeholder.png';
  selectedImg: any;

  character:any;
  characterForm:FormGroup;


  constructor( 
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private characterService:CharactersService
    ) { 

      this.route.queryParams.subscribe((val) => {
        const characterId = val['id'];
        if (characterId) {
          this.loadCharacter(characterId);
        } else {
          this.initializeForm();
        }
      
      });
  
      this.characterForm = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(5)]],
        category: ['', Validators.required],
        characterImg: ['', Validators.required],
        content: ['', Validators.required],
      });
    }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }



  loadCharacter(productId: string): void {
    this.characterService.loadData().subscribe((characters) => {
      if (Array.isArray(characters)) {
        for (let i = 0; i < characters.length; i++) {
          if (characters[i].id === productId) {
            this.character = characters[i];
            break; 
          }
        }
      }

      this.initializeForm();
    });
  }


initializeForm(): void {
    
    this.characterForm = this.fb.group({
      name: [this.character && this.character.data.name ? this.character.data.name : '', this.character ? [] : [Validators.required]],
      description: [this.character && this.character.data.description ? this.character.data.description : '', [Validators.minLength(5)]],
      category: [this.character && this.character.data.category ? this.character.data.category.category : '', Validators.required],
      characterImg: [''],
      content:[this.character && this.character.data.content ? this.character.data.content : '', Validators.required],
      
    });
    
    this.imgSrc = this.character?.data.image_link;
    if (this.character && this.character.data.category) {
      const categoryId = this.character.data.category.categoryId;
      const categoryName = this.character.data.category.category;
      const categoryValue = categoryId + '-' + categoryName;
      this.characterForm.get('category').setValue(categoryValue);
    }
  }


  showPreview($event) {
    const reader = new FileReader();
  reader.onload = (e) => {
    this.imgSrc = e.target.result;
  };
  reader.readAsDataURL($event.target.files[0]); // present the image
  this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    
    let splitted = this.characterForm.value.category.split('-');
  
    let powerLevel;
    if (splitted[1] === 'Gods' || splitted[1] === "Angels" || splitted[1] === "LocalGods" ) {
      powerLevel = '∞'; 
    } else if(splitted[1] === 'Evils' || splitted[1] === "Positives"){
      powerLevel = Math.floor(Math.random() * 999999901) + 100; 
    }else {
      powerLevel =  powerLevel = Math.floor(Math.random() * 4001) + 1000;
    }

    let characterData: Character = {
      name: this.characterForm.value.name,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      image_link: '',
      description: this.characterForm.value.description,
      content: this.characterForm.value.content,
      isFeatures: false,
      powerLevel: powerLevel + "",
      status: 'new',
      createdAt: new Date(),
      comments:[]
    };
  
    if (this.character) {
      this.character.data.name = characterData.name;
      this.character.data.category = characterData.category;
      this.character.data.description = characterData.description;
      this.character.data.content = characterData.content;
      this.character.data.isFeatures = characterData.isFeatures;
      this.character.data.status = characterData.status;
      this.characterService.updateCharacter(this.character);
    } else {
      this.characterService.uploadImage(this.selectedImg, characterData);
    }
  
    this.characterForm.reset(); 
    this.imgSrc = './assets/image_placeholder.png';
  }
  
}

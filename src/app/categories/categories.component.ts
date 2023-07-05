import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  formStatus:string='Add';
  formCategory:string;
  categoryArray:any;
  categoryId:string;


  constructor(private categoryService:CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val =>{
      console.log(val);
      this.categoryArray = val;
    })
  }

  onSubmit(formData){
    let categoryData :Category={
      category:formData.value.category
    }
    if(this.formStatus =='Add'){
      this.categoryService.saveData(categoryData);
      formData.reset(); // מאפסים את הטופס
    }
    else if(this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId,categoryData);
      formData.reset();  // מאפסים את הטופס
      this.formStatus='Add'; 
    }
  }

  onEdit(category,id){
    console.log(category);
    this.formCategory=category;
    this.formStatus='Edit';
    this.categoryId=id;
  }

  onDelete(id){
    this.categoryService.deleteData(id);
  }

}

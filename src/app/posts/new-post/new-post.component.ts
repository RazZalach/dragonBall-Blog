import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  categories: any;
  imgSrc: any = './assets/image_placeholder.png';
  selectedImg: any;

  postForm: FormGroup;
  post: any;

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    //atrape le id
    this.route.queryParams.subscribe((val) => {
      console.log(val);
      this.postService.loadOneData(val).subscribe((post) => {
        console.log(post);
        this.post = post;
        this.postForm = this.fb.group({
          title: [
            this.post.title,
            [Validators.required, Validators.minLength(10)],
          ],
          permalink: [this.post.permalink, Validators.required],
          excerpt: [
            this.post.excerpt,
            [Validators.required, Validators.minLength(5)],
          ],
          category: [this.post.category.categoryId, Validators.required],
          postImg: ['', Validators.required],
          content: [this.post.content, Validators.required],
        });
      });
    });

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  onTitleChanged($event) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview($event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]); //presonte l image
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    console.log(this.postForm.value);
    let splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatures: false,
      view: 0,
      status: 'new',
      createdAt: new Date(),
    };
    this.postService.uploadImage(this.selectedImg, postData);
    this.postForm.reset(); //netoy
    this.imgSrc = './assets/image_placeholder.png';
  }
}

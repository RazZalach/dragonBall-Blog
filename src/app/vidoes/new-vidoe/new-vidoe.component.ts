import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VidoeService } from 'src/app/services/vidoe.service';
@Component({
  selector: 'app-new-vidoe',
  templateUrl: './new-vidoe.component.html',
  styleUrls: ['./new-vidoe.component.css']
})
export class NewVidoeComponent implements OnInit {

  videoForm: FormGroup;
  isUploading: boolean = false;
  isWaiting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private videoService: VidoeService
  ) { }

  ngOnInit(): void {
    this.videoForm = this.formBuilder.group({
      title: [''],
      description: [''],
      videoFile: [null]
    });
  }
  onSubmit() {
    // Handle form submission and call the uploadVidoe method from the video service
    const { title, description, videoFile } = this.videoForm.value;
    this.videoService.uploadVidoe(title, description, videoFile);
    this.isUploading = true;
    this.isWaiting = true; 

  }
  onFileChange(event) {
    const file = event.target.files[0];
    this.videoForm.patchValue({ videoFile: file });
  }
  

}

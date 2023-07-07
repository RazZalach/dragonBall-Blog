import { Component, OnInit } from '@angular/core';
import { VidoeService } from 'src/app/services/vidoe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-vidoes',
  templateUrl: './all-vidoes.component.html',
  styleUrls: ['./all-vidoes.component.css']
})
export class AllVidoesComponent implements OnInit {
  videos$: Observable<any[]>;

  constructor(private videoService: VidoeService) { }

  ngOnInit(): void {
    this.videos$ = this.videoService.getAllVideos();
  }

  deleteVideo(videoId: string): void {
    if (confirm('Are you sure you want to delete this video?')) {
      this.videoService.deleteVideo(videoId)
        .then(() => {
          console.log('Video deleted successfully');
          // Optional: Show a success message
        })
        .catch(error => {
          console.error('Failed to delete video:', error);
          // Optional: Show an error message
        });
    }
  }
}

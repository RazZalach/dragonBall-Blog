import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VidoeService {
  private videosCollection: AngularFirestoreCollection<any>;

  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router) {
    this.videosCollection = afs.collection<any>('videos');
  }

  uploadVidoe(title: string, description: string, videoFile: File) {
    const filePath = `videos/${Date.now()}_${videoFile.name}`;
    this.storage.upload(filePath, videoFile).then(() => {
      // Video uploaded successfully
      // You can save additional metadata like title, description, and video URL to Firebase Firestore
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          this.videosCollection.add({
            title,
            description,
            filePath: filePath,
            videoURL: URL, // Save the video URL
            timestamp: Date.now()
          }).then(() => {
            // Success message or redirection logic
            this.toastr.success('Video uploaded successfully');
            console.log('Video uploaded successfully');
            this.router.navigate(['/vidoes']);
          }).catch(error => {
            // Error handling
            this.toastr.error('Failed to upload video');
            console.error(error);
          });
        });
    });
  }

  getAllVideos(): Observable<any[]> {
    return this.videosCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<any>[]) =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  deleteVideo(videoId: string): Promise<void> {
    return this.videosCollection.doc(videoId).delete();
  }
}

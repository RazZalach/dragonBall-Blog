import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  
  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router) { }


    uploadImage(selectedImage, characterData) {
      const filePath = `characterIMG/ ${Date.now()}`;
      console.log(filePath);
  
      this.storage.upload(filePath, selectedImage).then(() => {
        console.log('post image uploaded successfully');
        //hash qui fabrique des URL
        this.storage
          .ref(filePath)
          .getDownloadURL()
          .subscribe((URL) => {
            characterData.image_link = URL;
            console.log(characterData);
  
            this.saveData(characterData);
          });
      });
    }
    
    saveData(characterData) {
      characterData.comments = [];
      this.afs
        .collection('characters')
        .add(characterData)
        .then((docRef) => {
          this.toastr.success('data insert successfully');
          this.router.navigate(['/characters']);
        });
    }
    loadData(): Observable<Object> {
      //recuper les donne firebase
      return this.afs
        .collection('characters')
        .snapshotChanges()
        .pipe(
          map((actions) => {
            return actions.map((a) => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, data };
            });
          })
        );
    }
    loadOneData(id) {
      // ramenne les donne dapre id
      return this.afs.doc(`characters/ ${id}`).valueChanges();
    }

    deleteImage(image_link, id) {
      this.storage.storage
        .refFromURL(image_link)
        .delete()
        .then(() => {
          this.deleteData(id);
        });
    }
  
    deleteData(id) {
      this.afs
        .doc(`characters/${id}`)
        .delete()
        .then(() => {
          this.toastr.warning('Data Delete ...! ');
        });
    }
  
    markFeatured(id, featuredData) {
      this.afs
        .doc(`characters/${id}`)
        .update(featuredData)
        .then(() => {
          this.toastr.info('Featured Status Updated');
        });
    }
    updateCharacter(characterData) {
      this.afs
        .doc(`characters/${characterData.id}`)
        .update(characterData.data) 
        .then(() => {
          this.toastr.success('Character updated successfully');
          this.router.navigate(['/characters']);
        });
    }
    
    addComment(character: any, comment: string): void {
      const comments = character.data.comments || [];
      comments.push(comment);
    
      this.afs.doc(`characters/${character.id}`).update({
        comments: comments
      }).then(() => {
        this.toastr.success('Comment added successfully');
      });
    }
    // Inside CharactersService class
searchCharacters(searchTerm: string): Observable<any[]> {
  return this.afs
    .collection('characters', ref => ref.where('name', '>=', searchTerm).where('name', '<=', searchTerm + '\uf8ff'))
    .snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    );
}

    
    

}

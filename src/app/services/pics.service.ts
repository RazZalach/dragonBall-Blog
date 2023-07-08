import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, combineLatest, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PicsService {

  constructor(private storage: AngularFireStorage) { }

  getImageUrls(): Observable<string[]> {
    const ref = this.storage.ref("infopics/");
    return ref.listAll().pipe(
      switchMap((result) => {
        const observables: Observable<string | null>[] = [];
        result.items.forEach((item) => {
          const promise = item.getDownloadURL();
          const observable = from(promise);
          observables.push(observable);
        });
        return combineLatest(observables);
      })
    );
  }
}

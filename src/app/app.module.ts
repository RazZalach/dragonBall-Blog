import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashdoardComponent } from './dashdoard/dashdoard.component';
import { FormsModule } from '@angular/forms'; //perme de etulise (ngModel)
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CategoriesComponent } from './categories/categories.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; //authrisation
import { LoginComponent } from './auth/login/login.component';
import { AllCharacterComponent } from './characters/all-character/all-character.component';
import { NewCharacterComponent } from './characters/new-character/new-character.component';
import { StoreComponent } from './store/store/store.component';
import { HeaderStoreComponent } from './store/header-store/header-store.component';

import { AllComponent } from './store/all/all.component';
import { E404Component } from './e404/e404.component'; //lie avec storage

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashdoardComponent,
    CategoriesComponent,
    AllPostComponent,
    NewPostComponent,
    LoginComponent,
    AllCharacterComponent,
    NewCharacterComponent,
    StoreComponent,
    HeaderStoreComponent,
    AllComponent,
    E404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ToastrModule.forRoot(), //aspiree les function qui se trouve la bas
    BrowserAnimationsModule,
    AngularEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

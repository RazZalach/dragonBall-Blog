import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashdoardComponent } from './dashdoard/dashdoard.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { AllCharacterComponent } from './characters/all-character/all-character.component';
import { NewCharacterComponent } from './characters/new-character/new-character.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { StoreComponent } from './store/store/store.component';
import { AllComponent } from './store/all/all.component';
import { E404Component } from './e404/e404.component';


const routes: Routes = [
  { path: '', component: StoreComponent  },
  { path: 'character', component: AllComponent },

  { path: 'wm', component: DashdoardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },

  { path: 'posts', component: AllPostComponent, canActivate: [AuthGuard] },
  { path: 'posts/new', component: NewPostComponent, canActivate: [AuthGuard] },

  { path: 'characters', component: AllCharacterComponent, canActivate: [AuthGuard] },
  { path: 'characters/new', component: NewCharacterComponent, canActivate: [AuthGuard] },
  {path:'**',component:E404Component}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

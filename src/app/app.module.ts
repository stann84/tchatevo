import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
// import { FIREBASE_CONFIG } from './app.firebase.config';
=======
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth  } from 'angularfire2/auth';
import { CoreModule } from './core/core.module' ;
import { AngularFireDatabaseModule, AngularFireDatabase,  } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
>>>>>>> multiple-user

import * as firebase from 'firebase/app';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './booklist/single-book/single-book.component';
import { BookFormComponent } from './booklist/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { MessagesComponent } from './messages/messages.component';
import { SalonsComponent } from './salons/salons.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersService } from './services/users.service';
import { SingleUserComponent } from './single-user/single-user.component';
import { environment } from '../environments/environment';
<<<<<<< HEAD
=======
import { UserProfilComponent } from './user-profil/user-profil.component';
>>>>>>> multiple-user

const appRoutes: Routes = [
  {path: 'auth/signup' , component: SignupComponent},
  {path: 'auth/signin' , component: SigninComponent},
  {path: 'user-form' ,  component: UserFormComponent},
  {path: 'profil' ,  component: ProfilComponent},
  {path: 'listusers' , canActivate: [AuthGuardService] ,  component: ListUsersComponent},
  {path: 'user-profil'  ,  component: UserProfilComponent},
  {path: 'salons' , canActivate: [AuthGuardService], component: SalonsComponent},
  {path: 'messages' , canActivate: [AuthGuardService], component: MessagesComponent},
  {path: 'books', canActivate: [AuthGuardService], component: BookListComponent},
  {path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent},
  {path: 'users/view/:id', canActivate: [AuthGuardService], component: SingleUserComponent},
  {path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent},
  {path: '', redirectTo: 'auth/signup', pathMatch: 'full'},
  {path: '**', redirectTo: 'auth/signup'}

];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
    ProfilComponent,
    MessagesComponent,
    SalonsComponent,
    ListUsersComponent,
    UserFormComponent,
    SingleUserComponent,
    UserProfilComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
<<<<<<< HEAD
   // AngularFireModule.initializeApp(environment.firebase),
   // AngularFireDatabaseModule,
   // AngularFireAuthModule,
=======
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
>>>>>>> multiple-user
    HttpClientModule,
    CoreModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    BooksService,
    UsersService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

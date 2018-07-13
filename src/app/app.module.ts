import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';

// 3rd MODULES
import { FileSelectDirective } from 'ng2-file-upload';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

// import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';


// SERVICES
import { AuthService } from './core/auth.service';
import { PostService } from './posts/post.service';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { TestFunctionsComponent } from './test-functions/test-functions.component';
import { ProfileComponent } from './users/profile.component';
import { NewUserModalComponent } from './users/new-user-modal/new-user-modal.component';
import { LoginModalComponent } from './users/login-modal/login-modal.component';
import { NavbarComponent } from './core/navbar/navbar.component';

// MODULES
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostsComponent } from './posts/posts.component';
import { MapsComponent } from './maps/maps.component';
import { PostModalComponent } from './posts/post-modal/post-modal.component';


export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-auth-token',
    noTokenScheme: true,
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsComponent,
    NewPostComponent,
    FileSelectDirective,
    TestFunctionsComponent,
    ProfileComponent,
    NewUserModalComponent,
    NavbarComponent,
    LoginModalComponent,
    PostsComponent,
    MapsComponent,
    PostModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    LayoutModule
  ],
  providers: [AuthService,
      {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    PostService
  ],
  entryComponents: [
    NewUserModalComponent,
    LoginModalComponent,
    PostModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileSelectDirective } from 'ng2-file-upload';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

// import { AuthHttp, AuthConfig } from 'angular2-jwt'
// import { HttpModule, Http } from '@angular/http';
import { LayoutModule } from '@angular/cdk/layout';

// SERVICES
import { AuthService } from './core/auth.service';
import { PostService } from './core/post.service';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NewPostComponent } from './new-post/new-post.component';
import { TestFunctionsComponent } from './test-functions/test-functions.component';

// export function getAuthHttp(http: Http) {
//   return new AuthHttp(new AuthConfig({
//     headerName: 'x-auth-token',
//     noTokenScheme: true,
//     noJwtError: true,
//     globalHeaders: [{'Accept': 'application/json'}],
//     tokenGetter: (() => localStorage.getItem('id_token')),
//   }), http);
// }
export function tokenGetter() {
  return localStorage.getItem('id_token');
}

import { ProfileComponent } from './profile/profile.component';
import { NewUserModalComponent } from './modals/new-user-modal/new-user-modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        headerName: 'x-auth-token',
        throwNoTokenError: true,
        whitelistedDomains: ['http://176.223.143.125:3000/users/auth/me', 'localhost:4200'],
        blacklistedRoutes: ['localhost:3000/auth/']
      }
    }),
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
    //   {
    //   provide: AuthHttp,
    //   useFactory: getAuthHttp,
    //   deps: [Http]
    // },
    PostService
  ],
  entryComponents: [
    NewUserModalComponent,
    LoginModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

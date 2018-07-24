import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PostsComponent } from './posts/posts.component';
import { MapsComponent } from './maps/maps.component';
import { PostModalComponent } from './posts/post-modal/post-modal.component';
import { SelectPlaceComponent } from './maps/select-place/select-place.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule  } from '@angular/material';

// locales
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/lt';
import { FooterComponent } from './core/footer/footer.component';

registerLocaleData(localePt, 'lt-BR');

import {MatMenuModule} from '@angular/material/menu';

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
    SelectPlaceComponent,
    FooterComponent,
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
    LayoutModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatMenuModule
  ],
  providers: [AuthService,
      {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
<<<<<<< HEAD
    PostService, MatDatepickerModule, MatNativeDateModule,
    { provide: LOCALE_ID, useValue: 'lt-BR' }
=======
    PostService,
>>>>>>> PJ
  ],
  entryComponents: [
    NewUserModalComponent,
    LoginModalComponent,
    PostModalComponent
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

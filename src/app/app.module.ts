import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// SERVICES
import { AuthService } from './core/auth.service';
import { PostService } from './core/post.service';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NewPostComponent } from './new-post/new-post.component';
import { ProfileComponent } from './profile/profile.component';
import { NewUserModalComponent } from './modals/new-user-modal/new-user-modal.component';

// MODULES
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsComponent,
    NewPostComponent,
    ProfileComponent,
    NewUserModalComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule
  ],
  entryComponents: [
    NewUserModalComponent
  ],
  providers: [AuthService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }

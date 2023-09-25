import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import {HttpLink} from "apollo-angular/http";
import { InMemoryCache } from '@apollo/client/core';


const uri = 'http://testsour.satel.org:60121/gql/'; // адрес апи


export function createApollo(httpLink: HttpLink) {
  // создаем объект HttpHeaders с хедерами
  const http = httpLink.create({
    uri,
    headers: new HttpHeaders({
      'root-password':'SuperPas!@*#4fq3pm;o,.q',
      'root-employee-id':'1',
      'root-mimic':'true'
    })
  });
  return {
    cache: new InMemoryCache(),
    link: http,
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

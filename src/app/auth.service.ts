// auth.service.ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

// Мутация для авторизации на сервере GraphQL, используя gql
const LOGIN_MUTATION: any = gql`
mutation Login($login: String!, $password: String!) {
  login(login: $login, password: $password) {
    accessToken
    refreshToken
  }
}`
;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private apollo: Apollo) {}

  login(login: string, password: string) {
    // возвращаем результат выполнения мутации с помощью метода mutate из apollo
    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        login,
        password
      }
    });
  }
}

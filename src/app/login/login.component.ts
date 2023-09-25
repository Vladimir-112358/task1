import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { AuthService } from '../auth.service';

interface LoginResponse{
  accessToken: string
  refreshToken: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  userLogin: string; // логин пользователя
  password: string; // пароль пользователя
  message: string; // сообщение об ошибке или  успешном вхде

  constructor(private authService: AuthService) {
    this.authForm = new FormGroup<any>({
      userLogin: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.userLogin = ''; // инициализируем логин с пустым значением
    this.password = ''; // инициализируем пароль с пустым значением
    this.message = ''; // инициализируем сообщение с пустым значением
  }

  authorization() {
    const userLogin = this.authForm.get('userLogin').value;
    const password = this.authForm.get('password').value;
    // вызываем метод login из сервиса AuthService, передавая логин и пароль пользователя
    this.authService.login(userLogin, password).subscribe(
      ( data: any ) => {
        // получаем объект data из ответа сервера
        const accessToken = data.login.accessToken; // получаем accessToken из data.login
        const refreshToken = data.login.refreshToken; // получаем refreshToken из data.login
        if (accessToken && refreshToken) {
          // если оба токена получены, то сохраняем их в local storage
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          // выводим сообщение об успешной авторизации
          this.message = 'Авторизация прошла успешно';
        } else {
          // если что-то пшло не так - выводим
          this.message = 'Неверный логин или пароль';
        }
      },
      (error) => {
        // если сервер вернул ошибку, то выводим ее сообщение
        this.message = 'ошибка' + error.message;
      }
    );
  }
}

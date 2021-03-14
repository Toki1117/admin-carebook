import { TokenInfo } from './../models/token-info.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_URL } from 'src/app/shared/utils/api-urls';
import { shareReplay, take, takeWhile, tap } from 'rxjs/operators';
import { Account } from '../models/account';
import jwtDecode from 'jwt-decode';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UserInfo } from '../models/user-info.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<UserInfo>(null);
  private tokenInfo$ = new BehaviorSubject<TokenInfo>(null);
  constructor(private http: HttpClient, private ls: StorageService) {}

  get currentUser() {
    return this.user$.asObservable();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(loggedIn: boolean, token = null) {
    const tokenInfo: TokenInfo = token ? jwtDecode(token) : null;
    this.tokenInfo$.next(tokenInfo);
    this.ls.setItem(token, 'token');
    this.loggedIn.next(loggedIn);
    this.user$.next({
      idAccount: tokenInfo.id_account,
      email: tokenInfo.email,
    });
  }

  login(payload: Account) {
    return this.http
      .post<{ accessToken: string }>(API_URL.authentication.login, payload)
      .pipe(
        tap((res) => {
          this.setLoggedIn(true, res.accessToken);
        })
      );
  }

  getRefreshToken(payload: string) {
    return this.http
      .post<{ accessToken: string }>(API_URL.authentication.refresh, payload)
      .pipe(
        tap((t) => {
          this.setLoggedIn(true, t.accessToken);
        }),
        shareReplay()
      );
  }

  isValidToken(token: string) {
    const tokenInfo: TokenInfo = token ? jwtDecode(token) : null;
    if (tokenInfo) {
      const date = Date.now();
      const valid = date / 1000 < tokenInfo.exp;
      if (valid) {
        this.setLoggedIn(true, token);
      } else {
        this.logout();
      }
      return valid;
    } else {
      this.logout();
      return false;
    }
  }

  logout() {
    this.user$.next(null);

    this.loggedIn.next(false);
    localStorage.clear();
  }
}

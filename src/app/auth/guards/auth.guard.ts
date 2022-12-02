import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verifyAuth()
                 .pipe(
                  tap( isAuthenticated => {
                    if (!isAuthenticated) {
                      this.router.navigate(['./auth/login'])
                    }
                  })
                 )

    //   if (this.authService.auth.id) {
    //     return true;
    //   }

    // console.log('Block by AuthGuard - canActivate')
    // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verifyAuth()
                 .pipe(
                   tap( isAuthenticated => {
                     if (!isAuthenticated) {
                       this.router.navigate(['./auth/login'])
                     }
                   })
                 )

    //   if (this.authService.auth.id) {
    //     return true;
    //   }

    // console.log('Block by AuthGuard - canLoad')
    // return false;
  }
}

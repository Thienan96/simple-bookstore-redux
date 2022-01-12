import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CachingService } from './caching.service';



@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private cachingService: CachingService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(!!this.cachingService.localStorage.get(`userInfor`)) {
            return true;
        } else {
            window.alert('Please login first');
            this.router.navigate(['/']);
            return false;
        }
    }

}

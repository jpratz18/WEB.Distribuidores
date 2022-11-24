import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { catchError, delay, map, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthUtils } from '../utils/auth.utils';
import { UserService } from './user.service';

@Injectable()
export class AuthService
{
    private _path = environment.api + 'auth';
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    /**
     * Setter & getter for access token
     */
    setAccessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    getAccessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(this._path + '/signin', credentials).pipe(
            map((response: any) => {

                // Store the access token in the local storage
                this.setAccessToken(response.accessToken);

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;
                localStorage.setItem('currentUser', JSON.stringify(response.user));
                
                // Return a new observable with the response
                return HttpStatusCode.Ok;
            }),
            catchError(err => {
                console.error('status: ' + err.error.status + ' message: ' + err.error.message);
                return of(err.error);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check the access token availability
        if (!this.getAccessToken() )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.getAccessToken()) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return of(true);
    }
}

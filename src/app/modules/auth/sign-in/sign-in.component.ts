import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @ViewChild('signInNgForm') signInNgForm!: NgForm;

  signInForm!: FormGroup;
  message:string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router
  ) { }

  loading: Boolean = false;

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  /**
   * Sign in
   */
  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    // Disable the form
    //this.signInForm.disable();

    // Hide the alert
    this.loading = true;

    // Sign in
    this._authService.signIn(this.signInForm.value).subscribe(
      (response) => {
        if (response == HttpStatusCode.Ok) {
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
          this._router.navigateByUrl(redirectURL);
        } else {
          this.signInForm.enable();
          this.loading = false;
          // Reset the form
          this.signInNgForm.resetForm();
          console.log(response)
          if(response.status == HttpStatusCode.Unauthorized){
            this.message =  'Su correo electrónico o contraseña son incorrectas';
          }else {
            this.message =  response.message;
          }
          
          Swal.fire({
            title: 'Credenciales inválidas',
            text: this.message,
            icon: 'info',
            confirmButtonColor: 'var(--main-color)',
            confirmButtonText: 'Cerrar'
          }
          )
        }
      }
    );

  }

  displayFieldCss(field: string) {
    let control = this.signInForm.get(field);
    if(control?.touched){
      let result = !control?.valid;
      if(result){
        return {'is-invalid' : true}
      } else {
        return {'is-valid' : true }
      } 
    }
    return {'is-empty' : true }
  }

}

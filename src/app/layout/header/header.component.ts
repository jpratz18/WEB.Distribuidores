import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user.types';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user!: User;
  
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    if(this.user == null || this.user == undefined){
      this.user = JSON.parse(localStorage.getItem("currentUser") ?? '');
    }
  }

  signOut(){
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#146883',
      cancelButtonColor: '#212529',
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Mantener sesión',
    }).then((result) => {
      if (result.isConfirmed) {
        this._authService.signOut().subscribe((response) =>{
          console.log("signOut");
          this._router.navigateByUrl('/sign-in');
        });
      }
    })
  }

}

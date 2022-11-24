import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../core/models/user.types';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {

  user!: User;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this._userService.user$
            .subscribe((user: User) => {
                this.user = user;
            });
  }

  /**
   * On destroy
   */
   ngOnDestroy(): void
   {
       // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
   }

}

import { Component } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  user: User;
  titles;

  constructor(
    private us: UsersService,
    private router: Router,
    private ar: ActivatedRoute) {
    ar.params.forEach(params => {
      us.getUsers(parseInt(params.id)).forEach(
        userArr => {
          this.user = userArr[0];
          us.getTitles().forEach(data => {
            this.titles = data;
            this.titles.forEach(title => title.title === this.user.title ? this.user.title = title.id : this.user);
          });
        }
      );
    });
  }

  onSubmit() {
    this.user.title = parseInt(this.user.title);
    this.us.editUser(this.user).forEach(
      data => this.router.navigateByUrl('/users'));
  }
}

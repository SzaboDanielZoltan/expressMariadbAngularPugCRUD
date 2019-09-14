import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { Title } from 'src/app/model/title';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent {

  user: User = new User;
  titles: Array<Title>;

  constructor(
    private us: UsersService,
    private router: Router) {
    us.getTitles().forEach(data =>
      this.titles = data)
  }

  onSubmit() {
    this.user.title = parseInt(this.user.title);
    this.us.createUser(this.user).forEach(
      data => this.router.navigateByUrl('/users'));
  }
}

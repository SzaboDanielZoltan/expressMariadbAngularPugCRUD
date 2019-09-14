import { Component } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {

  constructor(private us: UsersService) { }

  users$: Observable<any> = this.us.getUsers();

  onDelete(id: number) {
    this.us.deleteUser(id).forEach(data => location.reload())
  }
}

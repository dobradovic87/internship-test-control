import { UserService } from 'src/app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  usersArray: Array<User> = [];

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.fetchUsers().subscribe(
      (results) => {
        for (const data of results) {
          const user = new User();
          user.id = data.id;
          user.firstName = data.firstName;
          user.surname = data.surname;
          user.gender = data.gender;
          this.usersArray.push(user);
        }
      },
      (err) => {}
    );
  }

  goToDetails(id: number): void {
    this.router.navigate(['/details', id]);
  }
}

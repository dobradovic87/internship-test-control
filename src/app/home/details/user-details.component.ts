import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-details',
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit {
  user: User = new User();
  friendsIds: Array<number> = [];
  suggestedIds: Array<number> = [];
  friendOfFriendsIds: Array<number> = [];
  userDirectFriends: Array<User> = [];
  friendsOfFriends: Array<User> = [];
  uniqueFriendOfFriendsIds: Array<number> = [];
  suggestedFriends: Array<User> = [];
  id: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.friendsIds = [];
      this.friendOfFriendsIds = [];
      this.uniqueFriendOfFriendsIds = [];
      this.suggestedIds = [];
      this.userDirectFriends = [];
      this.friendsOfFriends = [];
      this.suggestedFriends = [];
      this.getUsers();
    });
  }

  getUsers(): void {
    this.userService.fetchUsers().subscribe(
      (results) => {
        for (const data of results) {
          const user = new User();
          user.id = data.id;
          user.firstName = data.firstName;
          user.surname = data.surname;
          user.age = data.age;
          user.gender = data.gender;
          user.friends = data.friends;

          if (+this.id === user.id) {
            this.user = user;
            for (const friendId of this.user.friends) {
              for (const data of results) {
                if (friendId === data.id) {
                  const friend = new User();
                  friend.id = data.id;
                  friend.firstName = data.firstName;
                  friend.surname = data.surname;
                  friend.friends = data.friends;
                  this.userDirectFriends.push(friend);
                  for (const id of friend.friends) {
                    for (const data of results) {
                      if (id === data.id && id !== +this.id) {
                        this.friendOfFriendsIds.push(data.id);
                      }
                    }
                  }
                }
              }
            }

            this.friendsIds = this.user.friends;
            this.friendOfFriendsIds = this.friendOfFriendsIds.filter(
              (val) => !this.friendsIds.includes(val)
            );

            this.uniqueFriendOfFriendsIds = [
              ...new Set(this.friendOfFriendsIds),
            ];

            for (const id of this.uniqueFriendOfFriendsIds) {
              for (const data of results) {
                if (data.id === id) {
                  const friendOfFriends = new User();
                  friendOfFriends.id = data.id;
                  friendOfFriends.firstName = data.firstName;
                  friendOfFriends.surname = data.surname;
                  friendOfFriends.friends = data.friends;
                  this.friendsOfFriends.push(friendOfFriends);
                }
              }
            }

            for (const id of this.friendOfFriendsIds) {
              if (
                this.friendOfFriendsIds.indexOf(id) !==
                this.friendOfFriendsIds.lastIndexOf(id)
              ) {
                this.suggestedIds.push(id);
              }
            }
            this.suggestedIds = [...new Set(this.suggestedIds)];
            if (this.suggestedIds.length > 0) {
              for (const id of this.suggestedIds) {
                for (const data of results) {
                  if (data.id === id) {
                    const suggested = new User();
                    suggested.id = data.id;
                    suggested.firstName = data.firstName;
                    suggested.surname = data.surname;
                    this.suggestedFriends.push(suggested);
                  }
                }
              }
            }
          }
        }
      },
      (err) => {}
    );
  }

  goToAnotherUser(id: number): void {
    this.id = id.toString();
    this.router.navigate(['/details', this.id]);
  }

  goBack(): void {
    this.location.back();
  }

  goToHomepage(): void {
    this.router.navigate(['/']);
  }
}

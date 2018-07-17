import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageUrl;
  constructor(private upvc: UserService) { }

  ngOnInit() {
    // console.log(this.upvc.currentUser.user.userAvatar);
    this.imageUrl = this.upvc.currentUser.user.userAvatar;
    this.imageUrl = this.imageUrl.slice(this.imageUrl.lastIndexOf('\\') + 1);
    //  console.log(this.imageUrl);


  }

}

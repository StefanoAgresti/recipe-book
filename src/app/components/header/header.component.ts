import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;
  route: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((res) => {
      if (res) {
        this.user = res;
        this.route = '/recipes';
      } else {
        this.user = null;
        this.route = '/auth';
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}

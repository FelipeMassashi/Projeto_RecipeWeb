import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/date-storage.service';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){

  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      console.log(!user);
      console.log(!!user);
    });
    this.onFetchData();
  }


  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onLogout(){
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}

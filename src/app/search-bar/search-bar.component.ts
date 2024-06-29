import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit{
  constructor(private router: Router){}

  ngOnInit(): void {
  }

  doSearch(value:String){
    this.router.navigateByUrl(`/search/${value}`);
  }



}

import {Component, inject, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Observable, shareReplay} from 'rxjs';
import { map} from 'rxjs/operators';
import {ProductService} from "../services/product.service";
import {Product} from "../../common/product";

@Component({
  selector: 'app-navi-bar',
  templateUrl: './navi-bar.component.html',
  styleUrl: './navi-bar.component.scss'
})
export class NaviBarComponent {
  private breakpointObserver = inject(BreakpointObserver);



  imageURL: string = "https://placehold.co/600x400";



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );




}

import { Component, Input,OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";
import { Offer } from '../../models/offer';
import {Subscription} from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../../services/offer/offer.service';

@Component({
  selector: 'app-detail-work',
  standalone: true,
    imports: [
        RouterLink,
        SolidIconsModule
    ],
  templateUrl: './detail-work.component.html',
  styleUrl: './detail-work.component.scss'
})
export class DetailWorkComponent {
  public offer_id: any;
  public offer: any;

  private _subscription = new Subscription();

  constructor(private route: ActivatedRoute,private offerService: OfferService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      
      this.offer_id = params.get('offer_id');
    });

    this.getOfferById(this.offer_id);
  }

  public getOfferById(offer_id: any) {
    debugger
    this._subscription.add(
      this.offerService.getOfferById(offer_id).subscribe({
        next: (data) => {
          this.offer = data.data;
        },
        error: (err) => {
          console.error('Error:', err);
        },
        complete: () => {
          console.log('complete');
        }
      })
    );
  }
}

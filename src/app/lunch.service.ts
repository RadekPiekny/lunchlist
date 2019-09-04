
import {of as observableOf,  Observable } from 'rxjs';

import { tap, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

let _ID = 1;

const FAKE_API_LATENCY = () => Math.random() * 1000 + 500;

export interface ILunch {
  id: number;
  name: string;
  address: string;
  upvotes: number;
  lat: number,
  lng: number,
  position?: number;
}

@Injectable()
export class LunchService {

  private lunchStore: ILunch[] = [
    {
      id: _ID++,
      name: 'Kebab2Go',
      address: 'Budějovická 1125/11, 140 00 Praha 4-Michle',
      upvotes: 1,
      lat: 50.055850,
      lng: 14.453280
    },
    {
      id: _ID++,
      name: 'Sushi place',
      address: 'Budějovická 1667/64, 140 00 Praha 4-Michle',
      upvotes: 3,
      lat: 50.047364,
      lng: 14.437487
    },
    {
      id: _ID++,
      name: 'Melisek Restaurant',
      address: 'Budějovická 32, 140 00 Praha 4',
      upvotes: 1,
      lat: 50.056016,
      lng: 14.430191
    },
  ];

  constructor() { }

  getLunchList(): Observable<ILunch[]> {
    //const clone = JSON.parse(JSON.stringify(this.lunchStore)); //why? Cloning happened once
    return observableOf(this.lunchStore).pipe(
      delay(FAKE_API_LATENCY()),
      tap(() => {
        this.sortByVotes(this.lunchStore);
      })
    );
  }

  addLunch(lunch: ILunch): Observable<any> {
    return observableOf(null).pipe
    (
      delay(FAKE_API_LATENCY()),
      tap(() => {
        this.lunchStore.push({
          id: _ID++,
          name: lunch.name,
          address: lunch.address,
          upvotes: lunch.upvotes,
          lat: lunch.lat,
          lng: lunch.lng
        });
        this.sortByVotes(this.lunchStore);        
      })
    );
  }

  removeLunch(id: number): Observable<any> {
    return observableOf(null).pipe(delay(FAKE_API_LATENCY()),tap(() => {
      const lunchToRemove = this.lunchStore.find(lunch => lunch.id === id);
      if (lunchToRemove) {
        this.lunchStore = this.lunchStore.filter(lunch => lunch.id !== id);
      } else {
        console.log("t");
        throw new Error("Trying to remove non-existing lunch!");
      }
    }),);
  }

  upvoteLunch(id: number): Observable<any> {
    return observableOf(null).pipe(delay(FAKE_API_LATENCY()),tap(() => {
      const lunchToUpvote = this.lunchStore.find(lunch => lunch.id === id);
      if (lunchToUpvote) {
        lunchToUpvote.upvotes++;
      } else {
        throw new Error("Trying to upvote non-existing lunch!");
      };
    }),);
  }

  sortByVotes(lunchList: ILunch[]) {
    lunchList.sort((a, b) => {
      return a.upvotes-b.upvotes;
    })
    lunchList.forEach((l,i)=>l.position=i);
  }

  resetUpvotes(): Observable<any> {
    return observableOf(null).pipe(delay(FAKE_API_LATENCY()),tap(() => {
      this.lunchStore = this.lunchStore.map(lunch => Object.assign({}, lunch, { upvotes: 0 }));
    }),);
  }

}

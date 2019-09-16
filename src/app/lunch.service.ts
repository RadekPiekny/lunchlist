
import {of, Observable, Subject } from 'rxjs';
import { tap, delay, repeatWhen, map } from 'rxjs/operators';
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
  position?: Object;
}

@Injectable()
export class LunchService {
  lunchHttp = new Subject<boolean>();
  previousList: ILunch[];
  wtf: number = 0;
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
    
    return of(this.lunchStore).pipe(
      map(data => data.sort((a: ILunch, b: ILunch) => {
        let upvotes = a.upvotes - b.upvotes;
        if (upvotes !== 0) {
          return upvotes;
        }
        if (this.previousList) {
          let A_place: ILunch = this.previousList.find(pl => pl.id === a.id);
          let B_place: ILunch = this.previousList.find(pl => pl.id === b.id);
          let A_index: number = this.previousList.indexOf(A_place);
          let B_index: number = this.previousList.indexOf(B_place);
          return B_index - A_index;
        }
      })),
      map(data => data.reverse()),
      tap(data => this.previousList = JSON.parse(JSON.stringify(data))),
      delay(FAKE_API_LATENCY()),
      repeatWhen(() => this.lunchHttp)
    );
  }

  addLunch(lunch: ILunch): Observable<any> {
    return of(null).pipe
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
      })
    );
  }

  removeLunch(id: number): Observable<any> {
    return of(null).pipe(delay(FAKE_API_LATENCY()),tap(() => {
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
    return of(null).pipe(delay(FAKE_API_LATENCY()),tap(() => {
      const lunchToUpvote = this.lunchStore.find(lunch => lunch.id === id);
      if (lunchToUpvote) {
        lunchToUpvote.upvotes++;
      } else {
        throw new Error("Trying to upvote non-existing lunch!");
      };
    }),);
  }

  resetUpvotes(): Observable<any> {
    return of(null).pipe(delay(FAKE_API_LATENCY()),tap(() => {
      this.lunchStore = this.lunchStore.map(lunch => Object.assign({}, lunch, { upvotes: 0 }));
    }),);
  }

}


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
}

@Injectable()
export class LunchService {

  private lunchStore: ILunch[] = [
    {
      id: _ID++,
      name: 'Kebab2Go',
      address: 'Budějovická 1125/11, 140 00 Praha 4-Michle',
      upvotes: 1
    },
    {
      id: _ID++,
      name: 'Sushi place',
      address: 'Budějovická 1667/64, 140 00 Praha 4-Michle',
      upvotes: 3
    },
    {
      id: _ID++,
      name: 'Melisek Restaurant',
      address: 'Budějovická 32, 140 00 Praha 4',
      upvotes: 0
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

  addLunch(name: string): Observable<any> {
    return observableOf(null).pipe
    (
      delay(FAKE_API_LATENCY()),
      tap(() => {
        this.lunchStore.push({
          id: _ID++,
          name,
          address: '',
          upvotes: 0
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
      console.log(this.lunchStore);
      if (lunchToUpvote) {
        lunchToUpvote.upvotes++;
        this.sortByVotes(this.lunchStore);
      } else {
        throw new Error("Trying to upvote non-existing lunch!");
      };
    }),);
  }

  sortByVotes(lunchList: ILunch[]) {
    lunchList.sort((a, b) => {
      return a.upvotes-b.upvotes;
    })
  }

  resetUpvotes(): Observable<any> {
    return observableOf(null).pipe(delay(FAKE_API_LATENCY()),tap(() => {
      this.lunchStore = this.lunchStore.map(lunch => Object.assign({}, lunch, { upvotes: 0 }));
    }),);
  }

}

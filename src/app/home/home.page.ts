import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Observable, Subject, merge } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, startWith, share } from 'rxjs/operators';

import { DataService } from '../data/data.service';
import { Page } from '../data/data.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  form: FormGroup;

  page$: Observable<Page>;
  pageUrl$ = new Subject<string>();

  genderOptions = [{
    text: 'Any',
    value: ''
  }, {
    text: 'Male',
    value: 'male'
  }, {
    text: 'Female',
    value: 'female'
  }, {
    text: 'Genderless',
    value: 'genderless'
  }, {
    text: 'Unknown',
    value: 'unknown'
  }];

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.form = this.fb.group({
      name: [''],
      gender: ['']
    });
  }

  ngOnInit(): void {
    const formChanges$ = this.form.valueChanges.pipe(
      startWith({ name: ''}),
      debounceTime(700),
      distinctUntilChanged()
    );

    this.page$ = merge(formChanges$, this.pageUrl$).pipe(
      switchMap(searchParams => this.dataService.getCharacters(searchParams)),
      share()
    );
  }

  performPagination(url: string): void {
    this.pageUrl$.next(url);
  }

  clear(): void {
    this.form.patchValue({
      name: '',
      gender: ''
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

import { DataService } from '../data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  form: FormGroup;
  searchControl: FormControl;

  items$: Observable<any>;
  info$: Observable<any>;

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
      search: [''],
      gender: ['']
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      startWith({ search: ''}),
      debounceTime(700),
      distinctUntilChanged(),
      switchMap(changes => this.dataService.search(changes))
    ).subscribe();

    this.items$ = this.dataService.items;
    this.info$ = this.dataService.info;
  }

  performPagination(url: string): void {
    this.dataService.search({ url }).subscribe();
  }

  clear(): void {
    this.form.patchValue({
      search: '',
      gender: ''
    });
  }
}

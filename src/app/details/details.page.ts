import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  item$: Observable<any>;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.item$ = this.dataService.getCharacter(id).pipe(
      share()
    );
  }

}

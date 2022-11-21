import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [`
    mat-card {
      margin-top: 20px;
    }
  `]
})
export class ListComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.heroesService.getHeroes()
        .subscribe(heroes => {
          this.heroes = heroes;
        });
  }

}

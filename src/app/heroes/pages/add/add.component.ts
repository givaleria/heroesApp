import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.MarvelComics,
    alt_img: ''
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) {
      return;
    }

    this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.heroesService.getHeroeById(id) )
        )
        .subscribe( heroe => this.heroe = heroe );

  }

  save() {

    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService.updateHeroe(this.heroe)
          .subscribe( heroe => this.showSnackBar('Heroe Updated'));
    } else {
      this.heroesService.addHeroe(this.heroe)
          .subscribe(
            heroe => {
              this.router.navigate(['/heroes/edit', heroe.id]);
              this.showSnackBar('Heroe Created');
            }
          )
    }

  }

  deleteHeroe() {

    const dialog = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.heroesService.deleteHeroe(this.heroe.id!)
              .subscribe(resp => {
                this.router.navigate(['/heroes'])
              });
        }
      }
    )
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2500
    });
  }

}

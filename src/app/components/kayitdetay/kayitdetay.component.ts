import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kayit } from 'src/models/kayit';
import { FbservisService } from 'src/services/fbservis.service';

@Component({
  selector: 'app-kayitdetay',
  templateUrl: './kayitdetay.component.html',
  styleUrls: ['./kayitdetay.component.scss']
})
export class KayitdetayComponent implements OnInit {

  key: string;
  secKayit: Kayit = new Kayit();

  constructor(
    public route: ActivatedRoute,
    public fbservis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.key = p.key;
      this.KayitGetir();
    });
  }
  KayitGetir() {
    this.fbservis.KayitByKey(this.key).snapshotChanges().subscribe(d => {
      var k = { ...(d.payload.toJSON() as Kayit), key: this.key }
      this.secKayit = k;
    });
  }
}

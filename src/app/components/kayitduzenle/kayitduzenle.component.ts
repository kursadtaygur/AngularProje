import { FbservisService } from 'src/services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kayit } from 'src/models/kayit';

@Component({
  selector: 'app-kayitduzenle',
  templateUrl: './kayitduzenle.component.html',
  styleUrls: ['./kayitduzenle.component.scss']
})
export class KayitduzenleComponent implements OnInit {
  key: string;
  secKayit: Kayit = new Kayit();
  uid: string;

  constructor(
    public route: ActivatedRoute,
    public fbservis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    var user: any = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.route.params.subscribe(p => {
      this.key = p.key;
      this.KayitGetir();
    });
  }
  KayitGetir() {
    this.fbservis.KayitByKey(this.key).snapshotChanges().subscribe(d => {
      var k = { ...(d.payload.toJSON() as Kayit), key: this.key }
      this.secKayit = k;
      if (this.secKayit.uid != this.uid) {
        this.router.navigate(['/login'])
      }
    });
  }
  Kaydet() {
    var tarih = new Date();
    this.secKayit.duzTarih = tarih.getTime().toString();
    this.fbservis.KayitDuzenle(this.secKayit).then(d => {
      this.router.navigate(['/calismalarim'])
    });
  }
} 
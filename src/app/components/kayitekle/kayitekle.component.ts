import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kayit } from 'src/models/kayit';
import { FbservisService } from 'src/services/fbservis.service';

@Component({
  selector: 'app-kayitekle',
  templateUrl: './kayitekle.component.html',
  styleUrls: ['./kayitekle.component.scss']
})
export class KayitekleComponent implements OnInit {
  secKayit: Kayit = new Kayit();
  constructor(
    public fbservis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {

  }
  Kaydet() {
    var user: any = JSON.parse(localStorage.getItem("user"));
    this.secKayit.uid = user.uid;
    var tarih = new Date();
    this.secKayit.kayTarih = tarih.getTime().toString();
    this.secKayit.duzTarih = tarih.getTime().toString();
    this.fbservis.KayitEkle(this.secKayit).then(d => {
      this.router.navigate(['/calismalarim'])

    });
  }

}

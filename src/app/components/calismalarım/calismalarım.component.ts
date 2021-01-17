import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FbservisService } from 'src/services/fbservis.service';
import { Kayit } from 'src/models/kayit';

@Component({
  selector: 'app-calismalarım',
  templateUrl: './calismalarım.component.html',
  styleUrls: ['./calismalarım.component.scss']
})

export class CalismalarımComponent implements OnInit {
  uid: string;
  kayitlar: Kayit[];
  adsoyad: string;

  constructor(
    public fbservis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    var user: any = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.KayitListele();
  }
  OturumKapat() {
    this.fbservis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/giris']);
    });
  }
  KayitListele() {
    this.fbservis.KayitListeleByUID(this.uid).snapshotChanges().subscribe(data => {
      this.kayitlar = [];
      data.forEach(satir => {
        var y = { ...satir.payload.toJSON(), key: satir.key };
        this.kayitlar.push(y as Kayit);
      });
    });
  }

}

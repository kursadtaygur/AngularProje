import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kayit } from 'src/models/kayit';
import { FbservisService } from 'src/services/fbservis.service';

@Component({
  selector: 'app-kayitlar',
  templateUrl: './kayitlar.component.html',
  styleUrls: ['./kayitlar.component.scss']
})
export class KayitlarComponent implements OnInit {
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
    this.fbservis.KayitListele().snapshotChanges().subscribe(data => {
      this.kayitlar = [];
      data.forEach(satir => {
        var y = { ...satir.payload.toJSON(), key: satir.key };
        this.kayitlar.push(y as Kayit);
      });
    });
  }

}

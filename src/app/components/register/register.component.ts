import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/models/sonuc';
import { Uye } from 'src/models/uye';
import { FbservisService } from 'src/services/fbservis.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  secUye: Uye = new Uye();
  sonuc: Sonuc = new Sonuc();

  constructor(
    public fbservis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  KayitOl() {
    this.fbservis.UyeOl(this.secUye).then(d => {
      d.user.updateProfile({
        displayName: this.secUye.adsoyad
      }).then();
      this.secUye.uid = d.user.uid;
      this.UyeEkle();
      localStorage.setItem("user", JSON.stringify(d.user));
    }, err => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu. Tekrar Deneyiniz!"
    });
  }
  UyeEkle() {
    this.fbservis.UyeEkle(this.secUye).then(d => {
      this.router.navigate(['/']);
    });
  }

}

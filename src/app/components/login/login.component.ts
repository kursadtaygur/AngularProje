import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/models/sonuc';
import { FbservisService } from 'src/services/fbservis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  GirisYap(mail: string, parola: string) {
    this.fbServis.OturumAç(mail, parola).then(d => {
      localStorage.setItem("user", JSON.stringify(d.user))
      this.router.navigate(['/giris'])
    }, err => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "E-posta Adresi veya Parola Geçersizdir!";
    });
  }
}

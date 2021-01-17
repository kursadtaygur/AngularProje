import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kayit } from 'src/models/kayit';
import { FbservisService } from 'src/services/fbservis.service';

@Component({
  selector: 'app-giris',
  templateUrl: './giris.component.html',
  styleUrls: ['./giris.component.scss']
})
export class GirisComponent implements OnInit {
  uid: string;
  kayitlar: Kayit[];
  adsoyad: string;

  constructor(
    public fbservis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {

  }
  OturumKapat() {
    this.fbservis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/giris']);
    });
  }
}

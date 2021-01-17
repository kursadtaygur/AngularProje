import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kayit } from 'src/models/kayit';
import { FbservisService } from 'src/services/fbservis.service';

@Component({
  selector: 'app-kayitsil',
  templateUrl: './kayitsil.component.html',
  styleUrls: ['./kayitsil.component.scss']
})
export class KayitsilComponent implements OnInit {

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
        this.router.navigate(['/kayitlar'])
      }
    });
  }
  Sil() {
    this.fbservis.KayitSil(this.key).then(d => {
      this.router.navigate(['/calismalarim'])
    });
  }

}

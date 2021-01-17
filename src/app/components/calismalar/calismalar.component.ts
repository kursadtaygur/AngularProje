import { FbservisService } from './../../../services/fbservis.service';
import { StservisService } from './../../../services/stservis.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { Dosya } from 'src/models/dosya';
import { Router } from '@angular/router';
@Component({
  selector: 'app-calismalar',
  templateUrl: './calismalar.component.html',
  styleUrls: ['./calismalar.component.scss']
})
export class CalismalarComponent implements OnInit {
  dosyalar: Dosya[];
  files: FileList;

  constructor(
    public stServis: StservisService,
    public fbservis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.DosyaListele();

  }

  DosyaSec(e) {
    this.files = e.target.files;
  }
  DosyaListele() {
    this.stServis.DosyaListele().snapshotChanges().subscribe(data => {
      this.dosyalar = [];
      data.forEach(satir => {
        var y = { ...satir.payload.toJSON(), key: satir.key };
        this.dosyalar.push(y as Dosya);
      });
    });
  }
  DosyaYukle() {
    var file = this.files[0];
    var dosya = new Dosya();
    dosya.file = file;

    this.stServis.DosyaYukleStorage(dosya).subscribe(p => {
      console.log("Yuklendi");

    }, err => {
      console.log("Yukleyemedin");
    });
  }
  DosyaSil(dosya: Dosya) {
    this.stServis.DosyaSil(dosya);
  }
  OturumKapat() {
    this.fbservis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/giris']);
    });
  }
}

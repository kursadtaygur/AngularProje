import { Dosya } from './../models/dosya';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class StservisService {
  private basePath = "/Calismalar";

  constructor(
    public db: AngularFireDatabase,
    public storage: AngularFireStorage
  ) { }

  DosyaYukleStorage(dosya: Dosya) {
    var tarih = new Date();
    const dosyaYol = this.basePath + "/" + dosya.file.name;
    const storageRef = this.storage.ref(dosyaYol);
    const yukleTask = this.storage.upload(dosyaYol, dosya.file)
    yukleTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadUrl => {
          dosya.url = downloadUrl;
          dosya.adi = dosya.file.name;
          dosya.tarih = tarih.getTime().toString();
          this.DosyaVerileriKaydet(dosya);
        })
      })
    ).subscribe();

    return yukleTask.percentageChanges();
  }
  DosyaVerileriKaydet(dosya: Dosya) {
    this.db.list(this.basePath).push(dosya);
  }
  DosyaListele() {
    return this.db.list(this.basePath);
  }
  DosyaSil(dosya: Dosya) {
    this.DosyaVeriSil(dosya).then(() => {
      this.StorageSil(dosya);
    });
  }
  DosyaVeriSil(dosya: Dosya) {
    return this.db.list(this.basePath).remove(dosya.key);
  }
  StorageSil(dosya: Dosya) {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(dosya.adi).delete();
  }

}

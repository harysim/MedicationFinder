import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import LRU from 'lru-cache';

interface Medication {
  code: number;
  name: string;
  brand: string;
  dosage: string;
  price: number;
  typeCode: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private medicationsUrl = 'assets/medi_price_arabic_v2.xlsx';
  private cache: LRU<string, Medication[]>;

  constructor(private http: HttpClient) {
    this.cache = new LRU({ max: 100, maxAge: 1000 * 60 * 60 }); // Cache for 1 hour
  }

  getMedications(): Observable<Medication[]> {
    const cachedData = this.cache.get('medications');
    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get(this.medicationsUrl, { responseType: 'arraybuffer' })
      .pipe(
        map((data: ArrayBuffer) => {
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const medications: Medication[] = XLSX.utils.sheet_to_json<Medication>(worksheet);
          this.cache.set('medications', medications);
          return medications;
        })
      );
  }
}

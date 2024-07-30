import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as ExcelJS from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private medicationsUrl = 'assets/medi_price_arabic_v2.xlsx';
  private cache = new Map<string, any[]>();

  constructor(private http: HttpClient) {}

  getMedications(): Observable<any[]> {
    if (this.cache.has('medications')) {
      return new Observable(observer => {
        observer.next(this.cache.get('medications') || []);
        observer.complete();
      });
    }

    return new Observable(observer => {
      this.http.get(this.medicationsUrl, { responseType: 'arraybuffer' }).subscribe((data: ArrayBuffer) => {
        const workbook = new ExcelJS.Workbook();
        workbook.xlsx.load(data).then(() => {
          const worksheet = workbook.getWorksheet(1);
          const medications: any[] = [];

          worksheet?.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {  // Skip the header row
              const medication = {
                code: row.getCell(1).value,
                name: row.getCell(2).value,
                brand: row.getCell(3).value,
                dosage: row.getCell(4).value,
                price: row.getCell(5).value,
                typeCode: row.getCell(6).value,
                type: row.getCell(7).value
              };
              medications.push(medication);
            }
          });

          this.cache.set('medications', medications);
          observer.next(medications);
          observer.complete();
        });
      });
    });
  }
}

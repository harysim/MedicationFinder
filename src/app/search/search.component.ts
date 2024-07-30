import { Component, OnInit } from '@angular/core';
import { MedicationService } from '../services/medication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  medications: any[] = [];
  allMedications: any[] = [];
  selectedSegment: string = 'all';

  constructor(private medicationService: MedicationService, private translate: TranslateService) {}

  ngOnInit() {
    this.medicationService.getMedications().subscribe(medications => {
      this.allMedications = medications;
      // Do not assign medications to this.medications here
    });
  }

  normalizeText(text: string): string {
    return text
      .normalize("NFD")
      .replace(/[\u064B-\u065F]/g, "")  // Remove Arabic diacritics
      .replace(/[\u0640-\u0652]/g, "")  // Remove tatweel
      .replace(/[\u0660-\u0669]/g, match => (match.charCodeAt(0) - 0x0660).toString())  // Convert Arabic numerals to Latin numerals
      .toLowerCase();
  }

  searchMedications(event: any) {
    const query = this.normalizeText(event.target.value);
    if (query && query.trim() !== '') {
      this.medications = this.allMedications.filter(medication =>
        this.normalizeText(medication.code.toString()).includes(query) ||
        this.normalizeText(medication.name.toString()).includes(query) ||
        this.normalizeText(medication.brand.toString()).includes(query)
      );
    } else {
      this.medications = []; // Clear medications list if search query is empty
    }
  }

  filterMedications() {
    if (this.selectedSegment === 'all') {
      this.medications = [...this.allMedications];
    } else {
      this.medications = this.allMedications.filter(medication =>
        this.normalizeText(medication.type.toString()).includes(this.selectedSegment)
      );
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}

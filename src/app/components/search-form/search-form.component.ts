import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  form: FormGroup | undefined
  startPage: number = 1

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.initForm()
    this.submit()
  }

  private initForm() {
    this.form = new FormGroup({
      'filter': new FormControl()
    });
  }

  submit() {
    if (this.form) {
      const filter = this.form?.get('filter')?.value ? this.form?.get('filter')?.value : '*'

      this.searchService.search(this.startPage, 50, filter).subscribe(
        (response) => {
          this.searchService.updateItems(response.relationships.items.data)
        },
        (error) => {
        }
      );
    }
  }
}

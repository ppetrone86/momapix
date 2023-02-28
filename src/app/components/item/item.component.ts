import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: any

  image?: any = {}
  loading: boolean = false
  showModal: boolean = false

  constructor(private itemService: ItemService) {
  }

  ngOnInit() {
    this.initItem()
  }

  initItem() {
    this.loading = true
    this.image.preview = 'https://via.placeholder.com/400x300'

    this.itemService.get(this.item.id).subscribe(response => {
        this.initImage(response.attributes)
        this.loading = false
      },
      error => {
        this.loading = false
      }
    )
  }

  initImage(attributes: any) {

    this.image.preview = attributes.url_thumb_l != null ? attributes.url_thumb_l : 'https://via.placeholder.com/400x300'
    this.image.image = attributes.url_thumb_m != null ? attributes.url_thumb_m : 'https://via.placeholder.com/400x300'
    this.image.category = attributes.category
    this.image.keywords = attributes.keywords

    this.image.archive = attributes.archive
    this.image.category = attributes.category
    this.image.copyrightstatus = attributes.copyrightstatus
    this.image.creation_date = attributes.creation_date
    this.image.date = attributes.date
    this.image.file_extension = attributes.file_extension
    this.image.file_name = attributes.file_name
    this.image.file_size = attributes.file_size
    this.image.headline = attributes.headline
    this.image.id = attributes.id
    this.image.id_event = attributes.id_event
    this.image.lastupdate_date = attributes.lastupdate_date
    this.image.license = attributes.license
    this.image.mime_type = attributes.mime_type
    this.image.section = attributes.section
    this.image.uploaded_date = attributes.uploaded_date
    this.image.xsize = attributes.xsize
    this.image.ysize = attributes.ysize
  }

  prepareDownload() {
    this.itemService.prepareDownload(this.item.id).subscribe(response => {
        this.download(response.id);
      },
      error => {
      }
    )
  }

  private download(id: any) {
    this.itemService.download(id).subscribe(response => {
      alert('Download completed. Response: ' + JSON.stringify(response))
    }, error => {
      alert('Download non completato. Details: ' + JSON.stringify(error))
    })
  }
}

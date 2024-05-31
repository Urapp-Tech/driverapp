import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { OrderStatus } from 'src/app/types/tasks.types';
import { ORDER_STATUSES } from 'src/app/utilities/constants';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnChanges {
  @Input() orderName: string = 'Temp Name';

  @Input() orderNumber!: number;

  @Input() orderStatus: OrderStatus = 'Driver-Assigned-For-Item-Pickup';

  @Input() customerPhone!: string;

  @Input() pickupLocationMarker: google.maps.Marker | null = null;

  @Input() dropLocationMarker: google.maps.Marker | null = null;

  @Output() moveToLocation = new EventEmitter<google.maps.Marker>();

  pickupLocationAddress!: string;

  dropLocationAddress!: string;

  pickupLocationIcon!: 'HOME' | 'SHOP';

  dropLocationIcon!: 'HOME' | 'SHOP';

  ORDER_STATUSES = ORDER_STATUSES;

  async getFormattedAddress(position: google.maps.LatLng) {
    const geocoder = new google.maps.Geocoder();
    const geocoderResponse = await geocoder.geocode({ location: position });
    return geocoderResponse.results[0].formatted_address;
  }

  getIconUrl(marker: google.maps.Marker) {
    const icon = marker.getIcon() as google.maps.Icon;
    return icon.url;
  }

  async ngOnChanges(changes: SimpleChanges) {
    const changedPickupLocationMarker =
      changes['pickupLocationMarker']?.currentValue;

    const changedDropLocationMarker =
      changes['dropLocationMarker']?.currentValue;

    if (changedPickupLocationMarker) {
      this.pickupLocationAddress = await this.getFormattedAddress(
        changedPickupLocationMarker.getPosition()
      );
      this.pickupLocationIcon = changedPickupLocationMarker
        .getIcon()
        .url.includes('home-pin-icon.png')
        ? 'HOME'
        : 'SHOP';
    }

    if (changedDropLocationMarker) {
      this.dropLocationAddress = await this.getFormattedAddress(
        changedDropLocationMarker.getPosition()
      );
      this.dropLocationIcon = changedDropLocationMarker
        .getIcon()
        .url.includes('home-pin-icon.png')
        ? 'HOME'
        : 'SHOP';
    }
  }
}

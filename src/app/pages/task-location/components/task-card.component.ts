import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DeliveryStatus } from 'src/app/types/tasks.types';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnChanges {
  @Input() orderName: string = 'Temp Name';

  @Input() orderNumber!: number;

  @Input() orderStatus: DeliveryStatus = 'New';

  @Input() customerPhone!: string;

  @Input() pickupLocationMarker: google.maps.Marker | null = null;

  @Input() dropLocationMarker: google.maps.Marker | null = null;

  @Output() moveToLocation = new EventEmitter<google.maps.Marker>();

  pickupLocationAddress!: string;

  dropLocationAddress!: string;

  orderStatusText = {
    New: 'New Order',
    PickedUp: 'Order Picked Up',
    'In-Delivery': 'Order In Delivery',
    Delivered: 'Order Delivered',
    Cancelled: 'Order Cancelled',
    Accepted: 'Order Accepted',
  };

  orderStatusColor = {
    New: '#6EE7B7',
    PickedUp: '#D8B4FE',
    'In-Delivery': '#FDBA74',
    Delivered: '#D1D5DB',
    Cancelled: '#FCA5A5',
    Accepted: '#93C5FD',
  };

  async getFormattedAddress(position: google.maps.LatLng) {
    const geocoder = new google.maps.Geocoder();
    const geocoderResponse = await geocoder.geocode({ location: position });
    return geocoderResponse.results[0].formatted_address;
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
    }

    if (changedDropLocationMarker) {
      this.dropLocationAddress = await this.getFormattedAddress(
        changedDropLocationMarker.getPosition()
      );
    }
  }
}

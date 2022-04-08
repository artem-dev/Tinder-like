import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../users/user';

@Component({
    selector: 'app-tinder-card',
    templateUrl: './tinder-card.component.html',
    styleUrls: ['./tinder-card.component.scss']
})
export class TinderCardComponent implements OnInit {
    @Input() user: User | undefined;
    @Input() active = false;
    @Output() liked: EventEmitter<Event> = new EventEmitter();
    @Output() disliked: EventEmitter<Event> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

}

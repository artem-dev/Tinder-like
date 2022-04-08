import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from './users/user';
import { UserService } from './users/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChildren('tinderCard') tinderCards: QueryList<ElementRef> = new QueryList<ElementRef>();
    private ngOnDestroy$: Subject<null> = new Subject<null>();
    loading: boolean = false;
    users: User[] = [];
    cardIndex: number = 0;
    statusList: any;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.getUserData();
    }

    ngOnDestroy() {
        this.ngOnDestroy$.next(null);
        this.ngOnDestroy$.complete();
    }

    getUserData() {
        this.loading = true;
        this.userService.getData()
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(users => {
                this.users = users;
                this.loading = false;
            });
    }

    onDisliked(index: number): void {
        if (this.tinderCards.get(index) && this.tinderCards.get(index)!.nativeElement) {
            this.tinderCards.get(index)!.nativeElement.style.transform = 'translate(120px, 0)';
            this.tinderCards.get(index)!.nativeElement.style.opacity = '0';
            this.cardIndex++;
        } else {
            this.resetCards();
        }
    }

    onLiked(index: number): void {
        if (this.tinderCards.get(index) && this.tinderCards.get(index)!.nativeElement) {
            this.tinderCards.get(index)!.nativeElement.style.transform = 'translate(-120px, 0)';
            this.tinderCards.get(index)!.nativeElement.style.opacity = '0';
            this.cardIndex++;
        } else {
            this.resetCards();
        }
    }

    onNext(index: number) {
        if (this.tinderCards.get(index) && this.tinderCards.get(index)!.nativeElement) {
            this.tinderCards.get(index)!.nativeElement.style.transform = 'translate(-120px, 0)';
            this.tinderCards.get(index)!.nativeElement.style.opacity = '0';
            this.cardIndex++;
        } else {
            this.resetCards();
        }
    }

    private resetCards() {
    this.tinderCards.forEach((card, index) => {
        card!.nativeElement.style.transform = 'none';
        card!.nativeElement.style.opacity = '1';
    })
    this.cardIndex = 0;
}

}

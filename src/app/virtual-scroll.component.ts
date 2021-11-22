import {
    Component,
    ViewContainerRef,
    TemplateRef,
    ChangeDetectorRef,
    AfterViewInit,
    OnInit,
    ViewChild,
} from '@angular/core';
import {BehaviorSubject, fromEvent, Subscription} from 'rxjs';

type List = any[];
type TrackByFn = (idx: number, item: any) => string | number;

interface ScrollInitSource {
    container: HTMLElement;
    templateRef: TemplateRef<any>;
    trackBy: TrackByFn;
    direction: 'top' | 'bottom';
}

interface ScrollSourceChanged {
    container: boolean;
    template: boolean;
    trackBy: boolean;
    items: boolean;
}

@Component({
    selector: 'virtual-scroll',
    template: '<div #placer style="position: static;width: 3px; background-color: transparent">hello</div>',
    styleUrls: ['./virtual-scroll.component.scss'],
})
export class VirtualScrollComponent implements AfterViewInit, OnInit {
    private static defaultTrackBy: TrackByFn = (idx, item) => (item as any).key;

    items;
    keySequence;
    container;
    trackBy;
    templateRef;
    range = [0, 0];
    direction: 'top' | 'bottom' = 'top';
    locationKey = null;


    private wrapperSize;
    @ViewChild('placer', {read: ViewContainerRef}) placer;

    private subscriptions;
    private resizeSubscription;

    constructor(
        public viewContainerRef: ViewContainerRef,
        public cdr: ChangeDetectorRef
    ) {

    }

    public initSource(rawSource: ScrollInitSource) {
        this.container = rawSource.container;
        this.trackBy = rawSource.trackBy;
        this.templateRef = rawSource.templateRef;
        this.direction = rawSource.direction;
        this.updateContainer(this.container);
    }

    public updateItems(items: List) {
        this.items = this.flattenItems(items);
        this.items = this.flattenItems(items);
        this.keySequence = this.items.map((item, idx) => this.trackBy(idx, item));
        this.range = [0, this.items.length];
        if (this.keySequence.includes(this.locationKey)) {

        } else if (this.direction === 'top') {
        } else {

        }
    }

    private updateContainer(container: HTMLElement) {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }

        this.getWrapperSize(container);
        this.subscriptions = fromEvent(container, 'scroll').subscribe((e) => {
            this.updatePosition();
        });

        const resizeObserver = new ResizeObserver(entries => {
            this.getWrapperSize(container);
        });
        resizeObserver.observe(container);
        this.resizeSubscription = {
            unsubscribe: () => {
                resizeObserver.unobserve(container);
            }
        }
    }

    getStateDiff(current, prev) {
        if (!prev) {
            return {
                container: true,
                template: true,
                trackBy: true,
                items: true,
                direction: true,
            }
        }
        const a = prev.container !== current.container;
        const b = prev.template !== current.template;
        const c = prev.trackBy !== current.trackBy;
        const d = prev.items !== current.items;
        const e = prev.direction !== current.direction;
        if (a || b || c || d) {
            return {
                container: a,
                template: b,
                trackBy: c,
                items: d,
                direction: e,
            }
        } else {
            return null;
        }
    }

    private getWrapperSize(wrapper) {
        const {offsetWidth, offsetHeight} = wrapper;
        this.wrapperSize = {
            w: offsetWidth,
            h: offsetHeight,
            minItemCount: Math.ceil(offsetHeight / 20),
        }
    }

    private updatePosition() {
    }

    private flattenItems(items: List, array = []): List {
        items.forEach((item) => {
            if (item.items) {
                array.push(
                    {title: item.title, translate: item.translate}
                )
                this.flattenItems(item.items, array);
            } else {
                array.push(item);
            }
        })
        return array;
    }


    ngOnInit() {
    }

    ngAfterViewInit() {
        this.cdr.detach();
    }

    render(viewContainerRef: ViewContainerRef, templateRef, items) {
        const views = [];
        items.forEach((item, i) => {
            const key = this.trackBy(i, item);
            const view = viewContainerRef.createEmbeddedView(
                templateRef,
                {
                    $implicit: item,
                },
                i
            );
            views.push(view);
            requestAnimationFrame(() => {
                if (view.rootNodes[0].nodeType === Node.COMMENT_NODE) {
                } else {
                }
            });
        });
        this.cdr.detectChanges();
    }
}

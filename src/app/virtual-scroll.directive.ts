import {
    Directive,
    Input,
    ViewContainerRef,
    ElementRef,
    TemplateRef,
    AfterViewInit,
    Injector,
    OnInit,
    ComponentFactoryResolver,
    ComponentRef, OnChanges, SimpleChanges,
} from '@angular/core';
import {VirtualScrollComponent} from './virtual-scroll.component';

@Directive({
    selector: '[virtualScroll]',
})
export class VirtualScrollDirective implements AfterViewInit, OnInit, OnChanges {
    @Input() virtualScrollContainer;
    @Input() virtualScrollOf;
    @Input() virtualScrollTrackBy;
    @Input() virtualScrollDirection: 'top' | 'bottom';
    componentRef: ComponentRef<VirtualScrollComponent>;
    viewInitiated = false;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private templateRef: TemplateRef<any>,
        private elementRef: ElementRef,
        private injector: Injector
    ) {
        // this.render(this.componentRef.instance.viewContainerRef);
        // this.rulerEl = document.createElement('div');
        // this.rulerEl.style.cssText =
        //   'height: 100%; position: static; width: 3px; padding: 0; margin: 0;';
        // this.trainEl = document.createElement('div');
        // this.trainEl.style.cssText =
        //   'height: 100%; position: absolute;width: 100%; background-color: transparent; padding: 0; margin: 0;';
    }

    @Input() minSize = '50';
    items = [1, 2, 3, 4, 5];
    computedStyle;

    ngAfterViewInit() {
        this.componentRef.instance?.initSource({
            trackBy: this.virtualScrollTrackBy,
            container: this.virtualScrollContainer,
            templateRef: this.templateRef,
            direction: this.virtualScrollDirection
        });
        this.viewInitiated = true;
        this.updateItems();
    }

    getSize(el: HTMLDivElement) {
        return {
            height: el.offsetHeight,
            width: el.offsetWidth,
            trackY: el.scrollHeight - el.offsetHeight,
            trackX: el.scrollWidth - el.offsetWidth,
        };
    }

    ngOnInit() {
        const compFactory = this.componentFactoryResolver.resolveComponentFactory(
            VirtualScrollComponent
        );
        // factory, null, self.injector, null
        this.componentRef = this.viewContainerRef.createComponent(
            compFactory,
            null,
            this.injector,
            null
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.viewInitiated) {
            if (['virtualScrollTrackBy', 'virtualScrollContainer', 'templateRef', 'virtualScrollDirection'].some(prop => changes[prop])) {
                console.error('can not change to different value of trakcy | container | templateRef | direction')
            }
            if (changes.virtualScrollOf) {
                this.updateItems();
            }
        }
    }

    private updateItems() {
        this.componentRef.instance?.updateItems(this.virtualScrollOf);
    }
}

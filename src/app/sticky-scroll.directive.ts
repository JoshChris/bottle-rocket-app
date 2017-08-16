import { Directive, ElementRef, Renderer2, HostListener, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[StickyScrollDirective]'
})
export class StickyScrollDirective {

	constructor(private renderer: Renderer2, private hostElement: ElementRef, @Inject(DOCUMENT) private document) { }

  	@HostListener("window:scroll", [])
		onWindowScroll() {
		let top = (this.document.documentElement && this.document.documentElement.scrollTop) || 
              this.document.body.scrollTop;
		if (top > 15) {
			this.renderer.addClass(this.hostElement.nativeElement, 'sticky');
		} else {
			this.renderer.removeClass(this.hostElement.nativeElement, 'sticky');
		}
	}
}


/*
.directive('changeClassOnScroll', function ($window) {
  return {
    restrict: 'A',
    scope: {
        offset: "@",
        scrollClass: "@"
    },
    link: function(scope, element) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= parseInt(scope.offset)) {
                element.addClass(scope.scrollClass);
            } else {
                element.removeClass(scope.scrollClass);
            }
        });
    }
  };
})
*/
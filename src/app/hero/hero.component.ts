import { Component, AfterViewInit, Renderer2, ElementRef, HostListener } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {
  private shrinkHeader = 300;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    // No animation needed here, handled by scroll
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scroll = window.pageYOffset || document.documentElement.scrollTop;
    const nativeElement = this.el.nativeElement;
    const splats = nativeElement.querySelector('.splats');
    const splatter = nativeElement.querySelector('.splatter');
    const splatter2 = nativeElement.querySelector('.splatter2');
    const splatter3 = nativeElement.querySelector('.splatter3');
    const content = nativeElement.querySelector('.content');

    if (scroll >= this.shrinkHeader) {
      this.renderer.addClass(splats, 'shrink');
      this.renderer.addClass(splatter, 'shrink');
      this.renderer.addClass(splatter2, 'shrink');
      this.renderer.addClass(splatter3, 'shrink');
      this.renderer.addClass(content, 'shrink');
    } else {
      this.renderer.removeClass(splats, 'shrink');
      this.renderer.removeClass(splatter, 'shrink');
      this.renderer.removeClass(splatter2, 'shrink');
      this.renderer.removeClass(splatter3, 'shrink');
      this.renderer.removeClass(content, 'shrink');
    }
  }
} 
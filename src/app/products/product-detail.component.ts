import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  pageTitle: string = "Product Detail";
  product: IProduct | undefined;
  products: IProduct[] = []; 
  errorMessage = "";
  sub!: Subscription;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.pageTitle += `: ${id}`;

    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.product = this.performFilter(id);
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: Number): IProduct {
    return this.products.filter((product: IProduct) => 
    product.productId === filterBy)[0];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(["/products"]);
  }

}

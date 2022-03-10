import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public myProduct: any;
  public allProducts: any = [];
  public isShowAdvice = false;
  public isShowVertus = false;
  constructor(
    public route: ActivatedRoute,
    public productService: ProductService,
  ) { }

  ngOnInit(): void {
      if (this.route.snapshot.paramMap.has('page_id')) {
        const id = this.route.snapshot.paramMap.get('page_id');
        console.log(id)
        this.productService.getProducts()
          .subscribe((resP: any) => {
            this.allProducts = resP;
            this.myProduct = this.allProducts.find((c: any) => c.page_id === id)
            console.log(this.myProduct)
            console.log(this.myProduct.range)
          });
      }
    }

  }

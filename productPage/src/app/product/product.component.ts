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
  public allProductsByRange: any = [];
  public isShowAdvice = false;
  public isShowVertus = false;
  constructor(
    public route: ActivatedRoute,
    public productService: ProductService,
  ) { }

  ngOnInit(): void {
      if (this.route.snapshot.paramMap.has('page_id')) {
        const id = this.route.snapshot.paramMap.get('page_id');
        this.productService.getProducts()
          .subscribe((resP: any) => {
            this.allProducts = resP;
            this.myProduct = this.allProducts.find((c: any) => c.page_id === id)
             this.productService.getProductGalien(this.myProduct.ean)
                .subscribe((prod: any) => {
                  this.myProduct.image = prod[0].image;
                });
            let productsCategory: Array<any>;
            this.productService.getProductsGalienbyCategory('range', this.myProduct.range !== 'ECHANTILLON' ? this.myProduct.range : 'PRODUIT_OFFERT')
              .subscribe((prods: any) => {
                productsCategory = prods;
                this.allProductsByRange = [];
                this.allProducts.map((c: any) => {
                  if(c.range === this.myProduct.range ){
                    if (c.ean !== this.myProduct.ean && c.page_id !== '97' && c.page_id !== '98' && c.page_id !== '95') {
                      c.image = productsCategory.find((p: any) => p.ean === c.ean).image;
                      this.allProductsByRange.push(c)
                    }
                  }
                })
              });
          },
            error => {
              console.log(error);
            });
      }
    }

  }

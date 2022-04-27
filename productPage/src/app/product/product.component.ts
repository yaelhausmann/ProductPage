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
        console.log(id)
        this.productService.getProducts()
          .subscribe((resP: any) => {
            this.allProducts = resP;
            this.myProduct = this.allProducts.find((c: any) => c.page_id === id)
             this.productService.getProductGalien(this.myProduct.ean)
                .subscribe((prod: any) => {
                  this.myProduct.image = prod[0].image;
                });
            this.allProducts.map((c: any) => {
                if(c.range === this.myProduct.range ){
                  if ((this.myProduct.range === 'ECHANTILLON' && c.page_id !== '92') || (this.myProduct.range === 'PRET_VENTE' && c.page_id !== '97' && c.page_id !== '98'))
                  this.allProductsByRange.push(c)
                }
            })
            console.log(this.myProduct)
            console.log(this.allProductsByRange)
          },
            error => {
              console.log(error);
            });
      }
    }

  }

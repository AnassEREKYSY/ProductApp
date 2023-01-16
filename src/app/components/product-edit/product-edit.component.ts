import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  prodectId:number;
  productFormGroup?:FormGroup;
  submitted:boolean=false;
  constructor(
    private route:ActivatedRoute, private productService:ProductService, private fb:FormBuilder,
    private eventDriverService:EventDriverService
    ) { 
    this.prodectId=route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.prodectId).subscribe(
      product=>{
        this.productFormGroup=this.fb.group({
          id:[product.id],
          name:[product.name,Validators.required],
          price:[product.price,Validators.required],
          quantity:[product.quantity,Validators.required],
          selected:[product.selected,Validators.required],
          available:[product.available,Validators.required],
        }
        )
      }
    );
  }

  onEditProduct(){
    this.submitted=true;
    this.productService.editProduct(this.productFormGroup?.value)
      .subscribe(data=>{
        this.eventDriverService.publishEvent({type:ProductActionsTypes.PRODUCT_UPDATED});
        alert("Success Product Updated")
      })
  }

}

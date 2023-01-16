import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductActionsTypes } from 'src/app/state/product.state';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productFormGroup?:FormGroup;
  submitted:boolean=false;
  constructor( 
    private fb:FormBuilder , private productsService:ProductService,
    private eventDriverService:EventDriverService
    ) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required],
    });;
  }

  onSaveProduct(){
    this.submitted=true;
    if(this.productFormGroup?.invalid) return;
    this.productsService.save(this.productFormGroup?.value)
      .subscribe(data=>{
        this.eventDriverService.publishEvent({type:ProductActionsTypes.PRODUCT_ADDED});
        alert("Success Saving product");
      });
  }

}

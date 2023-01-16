import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product.model';
import {Observable,of} from 'rxjs';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import {startWith,map,catchError} from 'rxjs/operators'
import { Router } from '@angular/router';
import { EventDriverService } from 'src/app/services/event.driver.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(
    private productservice:ProductService, private router:Router,
    private eventDriverService:EventDriverService
    ) { }

  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    });
  }

  onGetAllProducts(){
    this.products$=
    this.productservice.getAllProduct().pipe(
      map(data=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  onGetSelectedProducts(){
    this.products$=
    this.productservice.getSelectedProduct().pipe(
      map(data=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  onGetAvailableProducts(){
    this.products$=
    this.productservice.getAvailableProduct().pipe(
      map(data=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  onSearch(dataForm:any){
    this.products$=
    this.productservice.searchProduct(dataForm.keyword).pipe(
      map(data=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  onSelect(p:Product){
      this.productservice.select(p).subscribe(data=>{
        p.selected=data.selected;
      })
  }
  onDelete(p:Product){
    let v=confirm("etes vous sur de supprimer ça?");
    if(v==true)
    this.productservice.delete(p).subscribe(data=>{
      this.onGetAllProducts();
    })
  }

  onNewProduct(){
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event :ActionEvent){
      switch($event.type){
        case ProductActionsTypes.GET_ALL_PRODUCTS:this.onGetAllProducts();break;
        
        case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
        
        case ProductActionsTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
        
        case ProductActionsTypes.NEW_PRODUCTS:this.onNewProduct();break;
        
        case ProductActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
        
        case ProductActionsTypes.SELECT_PRODUCTS:this.onSelect($event.payload);break;
        
        case ProductActionsTypes.EDIT_PRODUCTS:this.onEdit($event.payload);break;
        
        case ProductActionsTypes.DELETE_PRODUCTS:this.onDelete($event.payload);break;
      }
  }
}

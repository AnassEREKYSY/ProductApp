import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({providedIn:"root"})
export class ProductService{
    constructor(private http:HttpClient){
    }
    getAllProduct():Observable<Product[]>{
        let host=environment.host;
        return this.http.get<Product[]>(host+"/products");
    }
    getSelectedProduct():Observable<Product[]>{
        let host=environment.host;
        return this.http.get<Product[]>(host+"/products?selected=true");
    }
    getAvailableProduct():Observable<Product[]>{
        let host=environment.host;
        return this.http.get<Product[]>(host+"/products?available=true");
    }
    searchProduct(keyword:String):Observable<Product[]>{
        let host=environment.host;
        return this.http.get<Product[]>(host+"/products?name_like="+keyword);
    }
    select(p:Product):Observable<Product>{
        let host=environment.host;
        p.selected=!p.selected;
        return this.http.put<Product>(host+"/products/"+p.id,p);
    }
    delete(p:Product):Observable<void>{
        let host=environment.host;
        p.selected=!p.selected;
        return this.http.delete<void>(host+"/products/"+p.id);
    }

    save(p:Product):Observable<Product>{
        let host=environment.host;
        return this.http.post<Product>(host+"/products",p);
    }

    getProduct(id:number):Observable<Product>{
        let host=environment.host;
        return this.http.get<Product>(host+"/products/"+id);
    }

    editProduct(p:Product):Observable<Product>{
        let host=environment.host;
        return this.http.put<Product>(host+"/products/"+p.id,p);
    }
}
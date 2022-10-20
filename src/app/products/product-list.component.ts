import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Iproducts } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: "pm-products",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"]
})

export class ProductListComponent implements OnInit{
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = "";
    sub!: Subscription;
    constructor(private productService: ProductService){}
    private _listFilter: string = '';
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        console.log("in setter", value);
        this.filteredProducts = this.performFilter(value);
    }
    products: Iproducts[] = [];
    filteredProducts: Iproducts[] = [];
    toggleImage: any = () => {
        this.showImage = !this.showImage;
    };
    ngOnInit(): void{
        console.log("in init")
        this.listFilter = "";
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products; 
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    };
    ngOnDestroy(): void{
        this.sub.unsubscribe();
    }
    
    performFilter(filter: string): Iproducts[]{
        filter = filter.toLowerCase();
        return this.products.filter((product: Iproducts) => product.productName.toLowerCase().includes(filter));
    };
    onRatingClicked(message: string): void{
      this.pageTitle = "Product List: " + message;
    }
}
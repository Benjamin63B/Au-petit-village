import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; // Importer Location pour la navigation
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // Correction du nom de la propriété 'styleUrls'
})
export class ProductComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location // Injection du service Location
  ) {}

  ngOnInit(): void {
    const productIdString = this.route.snapshot.paramMap.get('id');
    const productId = Number(productIdString);

    // Récupérer les détails du produit avec ID
    if (!isNaN(productId)) {
      this.productService.getProductById(productId).subscribe((data: Product) => {
        this.product = data;
      });
    }
  }

  // Méthode pour revenir en arrière
  goBack(): void {
    this.location.back();
  }
}

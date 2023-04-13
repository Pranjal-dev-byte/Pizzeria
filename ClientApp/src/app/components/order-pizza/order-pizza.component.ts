import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { PizzasDataService } from '../../services/pizzas-data.service';

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.css'],
})
export class OrderPizzaComponent implements OnInit {
  orderPizzasData: any;
  cart = {};
  orderArr: any = [];
  added = false;
  constructor(
    private pizzasData: PizzasDataService,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.pizzasData.getOrderPizzaData().subscribe((data: any) => {
      this.orderPizzasData = data;
      for (let elem of this.orderPizzasData) {
        elem.ingredients = this.convertToString(elem.ingredients);
        elem.toppings = this.convertToString(elem.toppings);
      }
      // console.log(data);
      console.log(this.orderPizzasData);
    });
  }
  convertToString(elem: any) {
    let arr = Array.from(elem);
    arr.splice(arr.indexOf('{'), 1);
    arr.splice(arr.indexOf('}'), 1);
    arr.splice(arr.indexOf('['), 1);
    arr.splice(arr.indexOf(']'), 1);
    let result = arr.filter((x) => x !== '"');
    let res = result.join('');
    return res;
  }
  addToCart(item: any) {
    this.orderArr.push(item);
    localStorage.setItem('pizzaOption', JSON.stringify(this.orderArr));
    console.log(this.orderArr);
    // this.cartService.sendOrderToCart(
    //   JSON.parse(localStorage.getItem('pizzaOption') || '{}')
    // );
    this.cart = {
      Email: localStorage.getItem('email'),
      PizzaOption: JSON.parse(localStorage.getItem('pizzaOption') || '{}'),
      PizzaIngredients: [],
    };
    // this.pizzasData.updateCartData(this.cart).subscribe((data) => {
    //   console.log(data);
    // });
    item.added = true;
  }
}

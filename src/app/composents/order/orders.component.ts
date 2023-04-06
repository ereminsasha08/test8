import {Component, OnInit} from '@angular/core';
import {Order} from '../../model/order.model';
import {OrderService} from '../../service/order.service';
import {Goods} from '../../model/goods.model';
import {OrderLine} from '../../model/order-line.model';
import {GoodsService} from '../../service/goods.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-order-list',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

  order: Order;
  orders: Order[] = [];
  goods: Goods[];
  newOrderLine = new OrderLine();
  selectedOrderLine: OrderLine;
  selectedOrder: Order;
  formOrder: FormGroup;

  errorMessage;


  constructor(private formBuilder: FormBuilder, private orderService: OrderService,
              private goodsService: GoodsService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.selectedOrderLine = null;
    this.newOrderLine = new OrderLine();
    this.getAllGoods();
    this.getAllOrders();
  }

  initForm() {
    this.formOrder = this.formBuilder.group({
      client: [''],
      address: [''],
      date: ['']
    });
  }

  getAllGoods() {
    this.goodsService.getAllGoods().subscribe(
      goods => this.goods = goods,
      error => this.errorMessage = error.message);
  }

  createOrder() {
    this.orderService.createOrder(this.formOrder.value).subscribe(
      () => this.ngOnInit(),
      error => this.errorMessage = error.message);
  }

  getAllOrders(): void {
    this.orderService.getAllOrders()
      .subscribe(orders => this.orders = orders,
        error => this.errorMessage = error.message);
  }

  deleteOrder(order: Order) {
    if (confirm(`Are you sure you want to delete order's client: ${order.client}?`)) {
      this.orderService.deleteOrder(order.id).subscribe(
        () => {
          this.ngOnInit();
          this.orders = this.orders.filter(g => g.id !== order.id);
          if (this.selectedOrder.id === order.id) {
            this.selectedOrder = null;
          }
        },
        error => this.errorMessage = error.message);
    }
  }

  getTotal(): number {
    return this.selectedOrder.orderLines.reduce((acc, line) => acc + line.goods.price * line.count, 0);
  }

  findPriceByName(name: string): number {
    return this.goods.find((g) => g.name === name).price;
  }

  updateOrder() {
    this.orderService.updateOrder(this.selectedOrder.id, this.selectedOrder).subscribe(
      () => this.ngOnInit(),
      error => this.errorMessage = error.message);
  }

  deleteOrderLine(orderId, lineId: number) {
    this.orderService.deleteOrderLine(orderId, lineId).subscribe(
      () => {
        this.ngOnInit();
        this.orderService.getOrderById(this.selectedOrder.id).subscribe(order => this.selectedOrder = order);
      },
      error => this.errorMessage = error.message
    );
  }

  addLine() {
    this.orderService.addOrderLine(this.selectedOrder.id, this.newOrderLine).subscribe(() => {
        this.ngOnInit();
        this.orderService.getOrderById(this.selectedOrder.id).subscribe(order => this.selectedOrder = order);
      },
      error => this.errorMessage = error.message);
  }

  updateOrderLine() {
    this.selectedOrderLine.name = this.selectedOrderLine.goods.name;
    this.orderService.updateOrderLine(this.selectedOrder.id, this.selectedOrderLine.id, this.selectedOrderLine).subscribe(
      () => {
        this.ngOnInit();
        this.orderService.getOrderById(this.selectedOrder.id).subscribe(order => this.selectedOrder = order);
      },
      error => this.errorMessage = error.message);
  }

  onSelect(orderLine: OrderLine): void {
    this.selectedOrderLine = orderLine;
  }

  onSelectOrder(order: Order) {
    this.orderService.getOrderById(order.id).subscribe(
      o => this.selectedOrder = o,
      error => {
        this.errorMessage = error.message;
        this.showError();
      });
  }

  cancelUpdate() {
    this.selectedOrder = null;
  }

  cancelAddOrderLine() {
    this.ngOnInit();
    this.orderService.getOrderById(this.selectedOrder.id).subscribe(order => this.selectedOrder = order);
  }

  showError() {
    this.errorMessage = null;
  }
}

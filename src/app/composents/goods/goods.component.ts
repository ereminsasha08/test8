import {Component, OnInit} from '@angular/core';
import {Goods} from '../../model/goods.model';
import {GoodsService} from '../../service/goods.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
})
export class GoodsComponent implements OnInit {

  goods: Goods[];
  newGoods: Goods = new Goods();
  selectedGoods: Goods;
  errorMessage: string;

  constructor(private goodsService: GoodsService) {
  }

  ngOnInit(): void {
    this.getGoods();
    this.selectedGoods = null;

  }

  getGoods(): void {
    this.goodsService.getAllGoods().subscribe(
      goods => this.goods = goods,
      error => this.errorMessage = error.message);
  }

  createGoods(): void {
    this.goodsService.createGoods(this.newGoods).subscribe(
      goods => {
        this.goods.push(goods);
        this.newGoods = new Goods();
      },
      error => this.errorMessage = error.message);
  }

  updateGoods(): void {
    this.goodsService.updateGoods(this.selectedGoods.id, this.selectedGoods)
      .subscribe(
        () => this.ngOnInit(),
        error => this.errorMessage = error.message);
  }

  deleteGoods(goods: Goods): void {
    if (confirm(`Are you sure you want to delete ${goods.name}?`)) {
      this.goodsService.deleteGoods(goods.id).subscribe(
        () => {
          this.ngOnInit();
          this.goods = this.goods.filter((g) => g.id !== goods.id);
        },
        error => this.errorMessage = error.message);
    }
  }

  onSelect(goods: Goods): void {
    if (goods != null) {
      this.selectedGoods = goods;
    } else {
      this.selectedGoods = goods;
      this.ngOnInit();
    }
  }

  showError() {
    this.errorMessage = null;
  }
}

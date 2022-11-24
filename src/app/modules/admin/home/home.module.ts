import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { HomeComponent } from './home.component';
import { BalanceChartComponent } from './balance-chart/balance-chart.component';
import { UnitsChartComponent } from './units-chart/units-chart.component';
import { OperatorsChartComponent } from './operators-chart/operators-chart.component';

@NgModule({
  declarations: [
    HomeComponent,
    BalanceChartComponent,
    OperatorsChartComponent,
    UnitsChartComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule
  ],
  exports     : [
    HomeComponent
  ]
})
export class HomeModule { }

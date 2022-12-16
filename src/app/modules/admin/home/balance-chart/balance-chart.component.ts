import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'balance-chart',
  templateUrl: './balance-chart.component.html'
})
export class BalanceChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  zones = ['Zona 1','Zona 2','Zona 3'];

  yearSelected = 2022;
  zoneSelected = 'Zona 1';

  data = [
    {
      zone: 'Zona 1',
      dataset: {
        data:[6005,2800],
        backgroundColor: ['#27ae60','#00aee4'],
        borderColor: ['#27ae60','#00aee4'],
        hoverBackgroundColor: ['#3fc378','#4dd4fd'],
        hoverBorderWidth: ['#27ae60','#00aee4']
      }
    },
    {
      zone: 'Zona 2',
      dataset: {
        data:[3212,7032],
        backgroundColor: ['#27ae60','#00aee4'],
        borderColor: ['#27ae60','#00aee4'],
        hoverBackgroundColor: ['#3fc378','#4dd4fd'],
        hoverBorderWidth: ['#27ae60','#00aee4']
      }
    },
    {
      zone: 'Zona 3',
      dataset: {
        data:[1232,3270],
        backgroundColor: ['#27ae60','#00aee4'],
        borderColor: ['#27ae60','#00aee4'],
        hoverBackgroundColor: ['#3fc378','#4dd4fd'],
        hoverBorderWidth: ['#27ae60','#00aee4']
      }
    }
  ]

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  
  pieChartType: ChartType = 'doughnut';

  pieChartPlugins = [
    DataLabelsPlugin
  ];

  pieChartData: ChartData<'doughnut'> = {
    labels: [ 'Procesadas', 'Inspeccionadas'],
    datasets: [], 
  }

  constructor() { }

  ngOnInit(): void { 
    this.loadChart();   
  }

  onChangeZone(event: Event){
    this.zoneSelected = (event.target as HTMLInputElement).value;
    this.loadChart();
  }

  onChangeYear(event: Event){
    this.yearSelected = Number((event.target as HTMLInputElement).value);
    this.loadChart();
  }

  loadChart(){
    this.pieChartData.datasets = [];
    this.pieChartData.datasets.push(this.data.find(x =>  x.zone == this.zoneSelected)?.dataset as ChartDataset<any>);
    this.chart?.update();
  }

}

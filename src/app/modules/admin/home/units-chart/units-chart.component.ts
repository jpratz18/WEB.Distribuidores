import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartDataset, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'units-chart',
  templateUrl: './units-chart.component.html'
})
export class UnitsChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  years = [2022,2021,2020];
  zones = ['Zona 1','Zona 2'];

  yearSelected = 2022;
  zoneSelected = 'Zona 1';

  data = [
    {
      year: 2022,
      zone: 'Zona 1',
      datasets : [
        { data: [ 6005, 5900, 8300, 8100, 5600, 5500, 4000, 4200], label: 'Procesadas', backgroundColor: ['#27ae60','#00aee4'], borderColor: ['#27ae60','#00aee4'], hoverBackgroundColor: ['#3fc378','#4dd4fd'], hoverBorderWidth: ['#27ae60','#00aee4']},
        { data: [ 2800, 4800, 4000, 1900, 8200, 2700, 6300, 3400], label: 'Inspeccionadas'}
      ]
    },
    {
      year: 2021,
      zone: 'Zona 1',
      datasets : [
        { data: [ 5005, 6900, 7000, 2500, 4600, 4500, 3000, 3200], label: 'Procesadas', backgroundColor: ['#27ae60','#00aee4'], borderColor: ['#27ae60','#00aee4'], hoverBackgroundColor: ['#3fc378','#4dd4fd'], hoverBorderWidth: ['#27ae60','#00aee4']},
        { data: [ 1800, 3800, 3000, 900, 7200, 3700, 5300, 2400], label: 'Inspeccionadas'}
      ]
    },
    {
      year: 2020,
      zone: 'Zona 1',
      datasets : [
        { data: [ 8005, 6900, 9000, 900, 6600, 6500, 5000, 5200] , label: 'Procesadas', backgroundColor: ['#27ae60','#00aee4'], borderColor: ['#27ae60','#00aee4'], hoverBackgroundColor: ['#3fc378','#4dd4fd'], hoverBorderWidth: ['#27ae60','#00aee4']},
        { data: [ 4800, 5800, 5000, 2900, 9200, 3700, 7300, 4400], label: 'Inspeccionadas'}
      ]
    },
    {
      year: 2022,
      zone: 'Zona 2',
      datasets : [
        { data: [ 8005, 6900, 8000, 9100, 6600, 6500, 5000, 5200], label: 'Procesadas', backgroundColor: ['#27ae60','#00aee4'], borderColor: ['#27ae60','#00aee4'], hoverBackgroundColor: ['#3fc378','#4dd4fd'], hoverBorderWidth: ['#27ae60','#00aee4']},
        { data: [ 4800, 5800, 5000, 2900, 9200, 3700, 7300, 4400], label: 'Inspeccionadas'}
      ]
    },
    {
      year: 2021,
      zone: 'Zona 2',
      datasets : [
        { data: [ 5005, 6900, 7000, 7100, 4600, 4500, 3000, 3200], label: 'Procesadas', backgroundColor: ['#27ae60','#00aee4'], borderColor: ['#27ae60','#00aee4'], hoverBackgroundColor: ['#3fc378','#4dd4fd'], hoverBorderWidth: ['#27ae60','#00aee4']},
        { data: [ 1800, 3800, 3000, 900, 7200, 3700, 5300, 2400], label: 'Inspeccionadas'}
      ]
    },
    {
      year: 2020,
      zone: 'Zona 2',
      datasets : [
        { data: [ 6005, 5900, 8000, 8100, 5600, 5500, 4000, 4200], label: 'Procesadas', backgroundColor: ['#27ae60','#00aee4'], borderColor: ['#27ae60','#00aee4'], hoverBackgroundColor: ['#3fc378','#4dd4fd'], hoverBorderWidth: ['#27ae60','#00aee4']},
        { data: [ 2800, 4800, 4000, 1900, 8200, 2700, 6300, 3400], label: 'Inspeccionadas'}
      ]
    }
  ]
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
      },
      y: {
        min: 1000
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      },
      title: {
        display: true
      }
    }
  };
  
  barChartType: ChartType = 'bar';
  barChartPlugins = [
    DataLabelsPlugin
  ];

  barChartData: ChartData<'bar'> = {
    labels: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'],
    datasets: []
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
    this.barChartData.datasets = [];
    this.barChartData.datasets.push(this.data.find(x =>  x.year === this.yearSelected && x.zone == this.zoneSelected)?.datasets[0] as ChartDataset<"bar", number[]>);
    this.barChartData.datasets.push(this.data.find(x =>  x.year === this.yearSelected && x.zone == this.zoneSelected)?.datasets[1] as ChartDataset<"bar", number[]>);
    this.chart?.update();
  }
  
}

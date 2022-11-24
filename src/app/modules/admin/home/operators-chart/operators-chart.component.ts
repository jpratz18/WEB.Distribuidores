import { Component, OnInit } from '@angular/core';
import { Operator } from 'src/app/core/models/operator.types';

@Component({
  selector: 'operators-chart',
  templateUrl: './operators-chart.component.html',
  styleUrls: ['./operators-chart.component.scss']
})
export class OperatorsChartComponent implements OnInit {

  constructor() { }

  data: Operator[] = [
    {
      name: "JUAN RUIZ SOTEL",
      avatar: "../../../../../assets/avatars/male-01.jpg",
      zone: "ZONA 1",
      type: "EN SITIO",
      unit: "2356-R341",
      status: "EN PROCESO"
    },
    {
      name: "LUIS SÁNCHEZ RÍO",
      avatar: "../../../../../assets/avatars/male-02.jpg",
      zone: "ZONA 2",
      type: "REMOTO",
      unit: "2356-R342",
      status: "ABIERTO"
    },
    {
      name: "EDUARDO CABRERA MORALES",
      avatar: "../../../../../assets/avatars/male-03.jpg",
      zone: "ZONA 1",
      type: "EN SITIO",
      unit: "2356-R343",
      status: "CERRADO"
    },
    {
      name: "ALONDRA CRUZ BONILLA",
      avatar: "../../../../../assets/avatars/female-01.jpg",
      zone: "ZONA 1",
      type: "REMOTO",
      unit: "2356-R344",
      status: "ABIERTO"
    },
    {
      name: "DULE MARIA SASTRE CALIZ",
      avatar: "../../../../../assets/avatars/female-02.jpg",
      zone: "ZONA 2",
      type: "EN SITIO",
      unit: "2356-R345",
      status: "CERRADO"
    }
  ]

  dataFiltered: Operator[] = [];

  zones = ['Zona 1','Zona 2'];
  zoneSelected = 'Zona 1';

  ngOnInit(): void {
    this.loadTable();
  }

  onChangeZone(event: Event){
    this.zoneSelected = (event.target as HTMLInputElement).value;
    this.loadTable();
  }

  loadTable(){
    this.dataFiltered = this.data.filter(x => x.zone == this.zoneSelected.toUpperCase());
  }

}

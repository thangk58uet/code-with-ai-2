import { Component, OnInit } from '@angular/core';
import { LocalStorageManagerService } from '@core/services/local-store-manager.service';
import { LocalStorageEnum } from '@shared/models/enum/local-store.enum';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'bpm-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userInfo: any;

  public pieChartPlugins = [pluginDataLabels];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom'
    },
    hover: {
      intersect: true,
      mode: 'nearest',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
        color: 'white',
        font: {size: 12}
      },
    }
  };
  public chartLabels: Label[] = ['Completed', 'Error', 'New', 'Active', 'Suspended'];
  public chartColors: Color[] = [
    {
      backgroundColor: ['#83c39f', 'rgb(255, 99, 132)', '#8ea4d2', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
    },
  ];
  public chartData: MultiDataSet = [
    [150, 200, 100, 15,60],
  ];

  public chartDataSets: ChartDataSets[] = [{
    data: [150, 200, 100, 15,60],
    backgroundColor: ['#83c39f', 'rgb(255, 99, 132)', '#8ea4d2', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
    hoverBorderWidth: 6,
  }]
  public chartType: ChartType = 'doughnut';

  constructor(private localStorage: LocalStorageManagerService) { }

  ngOnInit(): void {
    this.userInfo = this.localStorage.getData(LocalStorageEnum.User_Infor);;
  }

}

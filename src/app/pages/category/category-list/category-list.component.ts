import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleFadeIn400ms } from 'src/@vex/animations/scale-fade-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { CategoryService } from 'src/app/services/category.service';
import { componentSettings } from './category-list-config';
import { th } from 'date-fns/locale';
import { DatesFilter } from '@shared/functions/actions';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'vex-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations: [
    stagger40ms,
    scaleFadeIn400ms,
    fadeInRight400ms
  ]
})
export class CategoryListComponent implements OnInit {

  component
  constructor(
    customTitle: CustomTitleService,
    public categoryService: CategoryService,
    public _dialog:MatDialog
  ) {
    customTitle.set('Categorias')
  }

  ngOnInit(): void {
    this.component = componentSettings
  }
  rowClick(e: any) {
    let action = e.action
    let category = e.row
    switch (action) {
      case 'edit':
        this.categoryEdit(category)
        break;
      case 'remove':
        this.categoryRemove(category)
        break;
    }
  }
  categoryEdit(category: any) {
    throw new Error('Method not implemented.');
  }
  categoryRemove(category: any) {
    throw new Error('Method not implemented.');
  }
  setData(data: any = null) {
    this.component.filters.stateFilter = data.value
    this.component.menuOpen = false
    this.formatGetInputs()
  }
  search(data: any) {
    this.component.filters.numFilter = data.searchValue
    this.component.filters.textFilter = data.searchString
    this.formatGetInputs()
  }
  dateFilterOpen(){
    DatesFilter(this)
  }
  formatGetInputs() {
    let inputs = {
      numFilter: 0,
      textFilter: "",
      stateFilter: null,
      startDate: null,
      endDate: null
    }
    if(this.component.filters.numFilter!=""){
      inputs.numFilter=this.component.filters.numFilter
      inputs.textFilter=this.component.filters.textFilter
    }
    if (this.component.filters.stateFilter != null) {
      inputs.stateFilter = this.component.filters.stateFilter
    }
    if(this.component.filters.startDate!="" && this.component.filters.endDate!=""){
      inputs.startDate=this.component.filters.startDate
      inputs.endDate=this.component.filters.endDate
    }
    this.component.getInputs = inputs
  }

}

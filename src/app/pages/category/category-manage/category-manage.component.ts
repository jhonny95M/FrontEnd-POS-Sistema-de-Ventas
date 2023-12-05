import { Component, Inject, OnInit } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import * as configs from '../../../../static-data/configs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'vex-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit {

  icClose = icClose
  configs = configs
  form: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private alert: AlertService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryManageComponent>
  ) { 
    this.initForm()
  }

  ngOnInit(): void {
  }
  initForm(): void {

    this.form = this.fb.group({
      categoryId: [0, [Validators.required]],
      name: ['', Validators.required],
      description: [''],
      state: ['', [Validators.required]]
    })
  }
  CategorySave():void{
    if(this.form.invalid)
      return Object.values(this.form.controls).forEach(controls=>controls.markAllAsTouched())
      const categoryId=this.form.get('categoryId').value
      if(categoryId>0){
        this.categoryEdit(categoryId)
      }else{
        this.categoryRegister()
      }
    }
  
  categoryRegister():void {
    this.categoryService.CategoryRegister(this.form.value).subscribe(resp=>{
      if(resp.isSucces){
        this.alert.success('Excelente',resp.message)
        this.dialogRef.close(true)
      }else{
        this.alert.warn('Atencion',resp.message)
      }
    })
  }
  categoryEdit(categoryId: number) {
    throw new Error('Method not implemented.');
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import { element } from 'protractor';


@Component({
  selector: 'app-formularios-templete',
  templateUrl: './formularios-templete.component.html',
  styles: []
})
export class FormulariosTempleteComponent implements OnInit {

  public formulario: FormGroup;
  
  private regex: RegExp = /^[a-zA-Z\s]*$/;

  private data={
    name:'Alejandra Jmz',
    email: 'alejmz@hotmail.com',
    mensaje: 'buenos dias',
    // contrasena: '2Cgdgt$4',
    // password:'2Cgdgt$4'
  }

  constructor() {
    //Se ejecuta cuando entra el componente 
  }

  

  ngOnInit() { 
     //Se ejecuta cuando css y html se terminaron de renderizar 
     this.CrearFormulario();
  }

  public CrearFormulario():void{//void no return ningun valor

    this.formulario = new FormGroup({
      name :  new FormControl(null,[Validators.minLength(5),Validators.required, this.No_Numeros.bind(this)]),
      email : new FormControl(null,[Validators.required,Validators.pattern( /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
      mensaje : new FormControl(null,[Validators.required, Validators.minLength(5)]),
      contrasena : new FormControl (null, [Validators.minLength(8), Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      password: new FormControl(null)

    })

    this.formulario.patchValue(this.data)
    this.formulario.controls.password.setValidators(this.MatchPassword.bind(this))
  }

  public VerEstadoFormulario():void{
    // console.log(this.formulario)
    // console.log(this.formulario.value)
    console.log(this.data);
    this.data=this.formulario.value
    console.log(this.data);
    
  }

//Key es una variable de apoyo 
  private No_Numeros(control:FormControl):{[key:string]:boolean}{
    //   // console.log(control);

    if(control.value==null) return null


    if(!this.regex.test(control.value))
    return {ExisteNumero:true}
    return null
  }

  private MatchPassword(control:FormControl):{[key:string]:boolean}{

    // if(control.value!==this.formulario.controls.contrasena.value)

    if(control.value!==this.formulario['controls']['contrasena'].value)
    return {noigual:true}

    // console.log(this);
    
    return null
}}

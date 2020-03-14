# ez-form  
## Index  
1. [Descripcion](#descripcion)  
2. [Requisitos](#requisitos)
3. [Instalacion](#instalacion)  
4. [Uso](#uso)

     4.1  [Toaster](#toaster)  
     
     4.2  [Bootstrap](#bootstrap)
     
     4.3  [Animaciones](#animaciones)
  
## Descripcion
`ez-form` es un componente para angular 2+ que permite crear formularios reactivos facilmente.
 
## Requisitos

* Angular Material: [documentacion](https://material.angular.io/)
```text
    $ ng add @angular/material
```
  
##  Instalacion   

* Componente ez-form: [Documentacion](https://www.npmjs.com/package/@gordon_freeman/ez-form)  
```shell script  
    $ npm i @gordon_freeman/ez-form  
```  
  
  
  
## Uso  

Primero en importamos el modulo en modulo de angular en cual lo vayamos a usar, en este caso sera el `app.module.ts`

* Import `EzFormModule`
  
```typescript  
    @NgModule({  
      declarations: [  
        AppComponent  
      ],  
      imports: [  
        BrowserModule,  
        EzFormModule,  
        BrowserAnimationsModule,  
      ],  
      providers: [],  
      bootstrap: [AppComponent]  
    })  
```  

## Objeto de configuracion

Ahora necesitamos el objeto de configuracion con los campos que tendra nuestro formulario. Para este
caso el objeto de configuracion estara en nuestro `app.component.ts`  
  
### `app.component.ts`  
Nuestro formulario tendra los siguientes campos: 

* UUID: `Disabled` input (Opcional)
```typescript
      {
        controlName: 'uuid',
        type: {
          typeName: 'input'
        },
        disabled: true,
      },
```
* Password: `Password` input (Mandatorio)
```typescript
      {
        controlName: 'password',
        type: {
          typeName: 'input',
          class: 'password',
        },
        validators: [
          Validators.required,
        ]
      },
```
* Cumpleaños: `Date` input (Mandatorio)
```typescript
       {
        controlName: 'cumpleanios',
        placeholder: 'Ingresa tu fecha de nacimiento',
        hint: 'Ingresa una fecha valida',
        type: {
          typeName: 'date'
        },
        validators: [
          Validators.required,
        ]
      },
```
* Direccion: `Long text` input (Mandatorio)
```typescript
       {
        controlName: 'direccion',
        placeholder: 'Ingresa una direccion',
        type: {
          typeName: 'textarea',
          maxLength: 20,
        },
        validators: [
          Validators.required,
        ],
      },
```
* Email: `Text` input (Required, Email Validation)
```typescript
       {
        controlName: 'email',
        validators: [
          Validators.required,
          Validators.email
        ],
        placeholder: 'Ingresa un email',
        type: {
          typeName: 'input',
          maxLength: 30,
        },
        errorMessages: {
          required: 'El correo es mandatorio',
          email: 'Debe ingresar un correo valido',
        },
        hint: 'Ingrese un correo electronico'
      },
```
* Estado civil: `Select` input (Required)
```typescript
    {
        controlName: 'estadoCivil',
        placeholder: 'EJ *: Casado',
        label: 'Estado civil',
        hint: 'Eliga un estado civil',
        validators: [
          Validators.required
        ],
        type: {
          typeName: 'select',
          options: [
            {
              value: 1,
              label: 'Casado'
            },
            {
              value: 2,
              label: 'Soltero'
            }
          ]
        },
      },
```
* Ciudades: `Multiple Select` input  (Required, minimum 2)
```typescript
      {
        controlName: 'ciudades',
        type: {
          typeName: 'check',
          minRequired : 2,
          options: [
            {
              value: 1,
              label: 'Quito'
            },
            {
              value: 2,
              label: 'Cuenca'
            },
            {
              value: 3,
              label: 'Ambato'
            }
          ]
        },
        label: 'Ciudades',
        errorMessages: {
          required: 'Eliga dos ciudades por lo menos',
        }
      },    
```
* Fruta favorita: `Radio Button` input  (Required)
```typescript
        {
          controlName: 'frutaFavorita',
          validators: [
            Validators.required
          ],
          label: 'Fruta favorita',
          type: {
            typeName: 'radio',
            options: [
              {
                value: 3,
                label: 'Manzana'
              },
              {
                value: 1,
                label: 'Pera'
              },
              {
                value: 2,
                label: 'Piña'
              }
            ],
          },
        }
```

* Fotos: `File` input (Multiple)
  * Validators: Required, minSize, maxSize, file extension.
```typescript
{
      controlName: 'fotos',
      label: 'Fotografias',
      hint: 'Sube algunas fotos',
      placeholder: '',
      validators: [
        Validators.required,
        FileValidator.extensions(['png']),
        FileValidator.minSize(100),
        FileValidator.maxSize(500),
      ],
      errorMessages: {
        required: 'Es un campo obligatorio',
        fileExtension: 'Por favor suba archivos png',
        fileMinSize: 'El tamaño de cada archivo debe ser mayor a 100 kilobytes',
        fileMaxSize: 'El tamaño de cada archivo debe ser menor a 500 kilobytes',
      }
      type: {
        typeName: 'file',
        multiple: true,
        accept: '*/*',
        showFile: true,
        tableHeaders: { // Optional
          actions: 'Acciones',
          description: 'Archivos Entrantes'
        }
      }
    }
```
Estos campos deben estar dentro de un arreglo por ejemplo:
  
So in our `parentComponent.html` call the component.

```typescript  
  miConfiguracion = [
      {
        controlName: 'uuid',
        type: {
          typeName: 'input'
        },
        disabled: true,
      },
      {
        controlName: 'password',
        type: {
          typeName: 'input',
          class: 'password',
        },
        validators: [
          Validators.required,
        ]
      },
       .... Puedes agregar todos los campos que quieras   ... 
    ];
```  
  
```html  
    <ez-form
            [formConfig]="myConfiguration"
          >
          <button [disabled]="!usuario" class="btn btn-block btn-info">Submit</button>
    </ez-form>
```  
  
Si queremos que nuestro formulario este lleno con valores, entonces tenemos que declarar un objeto con los nombres de los controles
Por ejemplo:

```typescript  
    usuario = {
        uuid: 1234,
        email: 'juan.pecados@mail.com',
        estadoCivil: 1,
        birthday: '1999-02-16',
        frutaFavorita: 1,
        ciudades: [1, 3],
        password: '12133',
      };
```    

Ahora falta llamar al componente en nuestro template `html`
  
Template `app.component.html`:  

  
```html  
    <ez-form
            [formConfig]="miConfiguracion"
            [inputData]="usuario"
            [showToaster]="true"
            (dataFromForm)="escucharFormulario($event)"  
          >
          <button (click)="algunaFuncion()">Submit</button>  
    </ez-form>
```  

El componente tiene un `Output` de donde retornara la informacion del forumario o un `undefined` dependiendo si el
formulario ha sido llenado correctamente.
  

So we need to make use of the Output : `dataFromForm`"
    
Resultados:   
  
![formulario](https://github.com/velascoandrs/repo-de-imagenes/blob/master/material.png?raw=true)  


## Toaster
* El toaster es el mensaje que se muestra en pantalla cuando el formulario ha sido llenando.
* Puede ser un parametro opcional mostra el toaster.

Tambien podemos establecer los mensajes que el toaster mostrara:

```typescript
    myToasterConfig = {
        success: {
          type: 'info',
          title: 'GOOD',
          body: 'All right!!'
        },
        fail: {
          type: 'warning',
          title: 'BAD',
          body: 'Someting was wrong!!'
        }
      };
```    
Usamos el Input : `toasterConfig`"

```html  
    <ez-form
          ...
            [toasterConfig]="myToasterConfig"
          >...
```

### Bootstrap
Use the Input : `styleFramework`"
Por defecto el componente ez-form carga los campos con los componentes de `Angular Material`. 

Usamos el Input : `styleFramework`"

```html
    <ez-form
            ...
            styleFramework="bootstrap"
          >..
```

Resultados
![resultadoBootstrap](https://github.com/velascoandrs/repo-de-imagenes/blob/master/bootstrap.png?raw=true)


### Animaciones

The error messages animations for every form field could be modify, so we need to make use of [animate.css
](https://www.npmjs.com/package/animate.css?activeTab=versions). 

Las animaciones para los mensajes de error para cada campo del formulario pueden ser modificadas, para ello hacemos
uso de la libreria [animate.css](https://www.npmjs.com/package/animate.css?activeTab=versions). 

Usamos el Input : `msgErrorAnimation`:

```html
<ez-form
        ...
        [msgErrorAnimation]="'fadeInLeft'"
      >
```

Nuestro componente completo:

```html
    <ez-form
            [formConfig]="miConfiguracion"
            [inputData]="usuario"
            (dataFromForm)="escucharFormulario($event)"
            [styleFramework]="'material'"
            [msgErrorAnimation]="'fadeInLeft'"
            [toasterConfig]="myToasterConfig"
          >
            <button [disabled]="!usuario" class="btn btn-block btn-info">Submit</button>
          </ez-form>
```
## Autocomplete
Tambien vamos agregar un autocomplete para buscar un articulo de wikipedia

```typescript
    {
          controlName: 'articulo',
          validators: [
            Validators.required
          ],
          label: 'Articulo de wikipedia',
          placeholder: 'Ejemplo: DNA',
          type: {
            typeName: 'autocomplete',
            completeMethod: this.filterWikipediaArticleByTitle,
            nameAutoComplete: 'title',
            componentReference: this
          },
          errorMessages: {
            required: 'El articulo es mandatorio',
          },
          hint: 'Busca un articulo'
        },

    filterWikipediaArticleByTitle(event, contexto) {
        return contexto._wikipediaService.findArticle(event.query ? event.query : event);
      }
```

### Metodo de filtrado
```text
    The filter service methond must return an observable. If you need format the data from the API, 
    you should use the `pipe` operator.
```
```text
    El metodo del servicio para filtrar debe retornar un observable. Si necesitas dar algun formato a la los datos que
    trae la API se deberia hacer uso del operador `pipe` operator.
```

Por ejemplo: 

El codigo del metodo `find` en el servicio de wikipedia:

```typescript
    find(query: string): Observable<any> {
        const url = `${this.url}&srsearch=${query}`;
        return this._httpClient.get(url)
        .pipe(
          mergeMap(
            (response: any) => {
              if (response.query) {
                return of(response.query.search);
              }
              return of([]);
            }
          )
        );
      }
```

### Resultados
* Material

![autocomplete-material](https://github.com/velascoandrs/repo-de-imagenes/blob/master/autocomplete/material.PNG?raw=true)

* Bootstrap (Se hace uso del autocomplete de PrimeNG)

![autocomplete-primeng](https://github.com/velascoandrs/repo-de-imagenes/blob/master/autocomplete/primeng.PNG?raw=true)

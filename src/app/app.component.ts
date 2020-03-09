import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {PlosService} from './plos.service';
import {FileValidator} from '@gordon_freeman/ez-form';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    title = 'formularios';
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
        //
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
        {
            controlName: 'ciudades',
            type: {
                typeName: 'check',
                minRequired: 2,
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
        },
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
            },
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
        },
        {
            controlName: 'articulo',
            label: 'Articulo de wikipedia',
            placeholder: 'Ejemplo: DNA',
            validators: [],
            type: {
                typeName: 'autocomplete',
                maxLength: 30,
                completeMethod: this.filterWikipediaArticleByTitle,
                nameAutoComplete: 'title',
                componentReference: this
            },
            errorMessages: {
                required: 'El articulo es mandatorio',
            },
            hint: 'Busca un articulo'
        },
    ];
    usuario = {
        uuid: 1234,
        email: 'juan.pecados@mail.com',
        estadoCivil: 1,
        cumpleanios: '1999-02-16',
        frutaFavorita: 1,
        ciudades: [1, 3],
        password: '12133',
        direccion: 'Isla Pinta',
        articulo: {title: 'DNA'},
    };


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

    escucharFormulario(evento) {
        this.usuario = evento ? evento : undefined;
        if (this.usuario) {
            console.log('todo OK: ', this.usuario);
        } else {
            console.log('todo mal');
        }
    }

    constructor(
        private readonly _wikipediaService: PlosService
    ) {
    }

    filterWikipediaArticleByTitle(event, contexto) {
        return contexto._wikipediaService.findArticle(event.query ? event.query : event);
    }
}

import { MainObject } from "./App";

export const objeto: MainObject = {
    "color": "white",
    "title": "Clinica Los Santis",
    "count": 2,
    "screens": [
      {
        "stepName": "Datos personales",
        "fields": [
          {
            "name": "name",
            "fieldType": "TEXT",
            "label": "Nombre",
            "placeholder": "John Doe",
            "options": [],
            "description": {
              "text": "Indique su nombre como aparece en el DNI",
              "position": 'ABOVE'
            }
          },
          {
            "name": "email",
            "fieldType": "TEXT",
            "label": "Email",
            "placeholder": "johndoe@gmail.com",
            "options": [],
            "description": {
              "text": "Indique su email de google",
              "position": 'ABOVE'
            }
          }
        ]
      },
      {
        "stepName": "Mas datos",
        "fields": [
          {
            "name": "yearsOfExperience",
            "fieldType": "OPTIONS",
            "label": "años de experiencia",
            "placeholder": "johndoe@gmail.com",
            "options": [
              {
                "id": "1",
                "description": "No tengo experiencia"
              },
              {
                "id": "2",
                "description": "1 a 3 de experiencia"
              }
            ],
            "description": null
          },
          {
            "name": "sex",
            "fieldType": "RADIO",
            "label": "genero",
            "placeholder": "",
            "options": [
              {
                "id": "mujer",
                "description": "Mujercita"
              },
              {
                "id": "hombre",
                "description": "hombrecito"
              },
              {
                "id": "n/a",
                "description": "no especificado pa"
              },
            ],
            "description": null
          },
          {
            "name": "preferences",
            "fieldType": "MULTIPLE",
            "label": "Gustos",
            "placeholder": "",
            "options": [
              {
                "id": "music",
                "description": "Musica"
              },
              {
                "id": "art",
                "description": "Arte"
              },
              {
                "id": "soccer",
                "description": "futbol"
              },
              {
                "id": "painting",
                "description": "pintura"
              }
            ],
            "description": null
          },
        ]
      }
    ]
  }
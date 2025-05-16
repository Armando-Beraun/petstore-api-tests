@e2e
Feature: Crear y recuperar una mascota en Swagger Petstore
  Background:
    * url 'https://petstore.swagger.io/v2'
  Scenario: Crear una mascota y luego recuperarla
 # Paso 1: Crear mascota con POST
    #solo para ver cambios en el git y yml
    #comentario
    Given path 'pet'
    And request
 """
 {
 "id": 2,
 "name": "IKKI",
 "photoUrls": ["https://ejemplo.com/foto.jpg"],
 "status": "available"
 }
 """
    When method POST
    Then status 200
    And match response.name == 'Firulais'
 # Guardar el ID
    * def petId = response.id
 # Paso 2: Recuperar con GET
    Given path 'pet', petId
    When method GET
    Then status 200
    And match response.name == 'Firulais'
    And match response.id == petId

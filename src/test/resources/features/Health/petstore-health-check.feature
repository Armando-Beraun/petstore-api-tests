@smoke
Feature: Verificar conectividad con la API Petstore
  Scenario: El endpoint base responde con 200
    Given url 'https://petstore.swagger.io/v2/pet/findByStatus?available'
    When method GET
    Then status 200
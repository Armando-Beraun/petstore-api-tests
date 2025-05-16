Feature: Obtener una mascota por Id desde Swagger Petstore

  Background:
    * url 'https://petstore.swagger.io/v2'

    Scenario: consultar una mascota existente por ID

      Given path 'pet', 1
      When method GET
      * print "el valor de status es:.....", responseStatus
      Then status 200
      #validacion de campos
      And match response.id ==1
      And match response.name !=null
      #And match response.status in ['avaliable','pending','sold']
      And match ['available', 'pending', 'sold'] contains responseStatus

#=============
#Feature: Obtener una mascota por ID desde Swagger Petstore  Background:    * url 'https://petstore.swagger.io/v2'    Scenario: Consultar una mascota existente por ID      Given path 'pet', 1      When method GET      Then status 200      # validacion de campos      * print "El valor de status es ====>   ", response.status      And match response.id == 1      And match response.name != null      # And match response.status in ['available','pending','sold']      And match ['available', 'pending', 'sold'] contains response.status
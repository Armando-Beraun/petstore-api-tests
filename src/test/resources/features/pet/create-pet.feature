#@funcional1
#  Feature: Crear una nueva mascota en petstore

#    Background:
#      * url 'https://petstore.swagger.io/v2'
#      * def randomId = Math.floor(Math.random()*1000000)
#      * def randomName = 'Pet' + randomId


#      Scenario: Crear nua mascota con datos dinamicos
#        Given path 'pet'
#        And request
#        """
#        {
#         "id":#(randomId)
#         "name":"#(randomName)"
#         "photoUrls":["https://ejemplo.com/foto.jpg"]
#         "status":"available"
#        }
#        """
#        When method POST
#        * print "el valor de status es:.....", responseStatus
#        Then status 200
##        * print "randomId===>",randomId
##        * print "randomName===>",randomName


  #======================
@functional1
Feature: Crear una nueva mascota en Petstore
    Background:
      * url 'https://petstore.swagger.io/v2'
      * def randomId = Math.floor(Math.random() * 1000000)
      * def randomName = 'Pet-' + randomId

    Scenario: Crear una mascota con datos dinamicos
      Given path 'pet'
      And request
      """
      {  "id": #(randomId),
       "name": "#(randomName)",
       "photoUrls": ["https://ejemplo.com/foto.jpg"],
       "status": "available"
       }
      """
      When method POST
      Then status 200
      # Validaciones clave
      # And match response.id == randomId
      # And match response.name == randomName
      # And match response.status == 'available'
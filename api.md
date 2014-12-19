# GET /health
+ Response 200 (text/plain)
      
      We're online!
     

# GET /i18n/1?locale=de_de

+ Response 200 (application/json)
    
    { "message": "Hello World!" }
    
# GET /i18n/2?locale=de_de

+ Response 200 (application/json)
    
    { "message": "Nope." }
    
# POST /i18n/search?locale=de_de

+ Response 200 (application/json)
    
    { "message": "Nope.", "id": 2 }
    
# POST /i18n

+ Response 204 (application/json)
    
    { "id": 3 }